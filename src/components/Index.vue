<template>
    <el-menu
            mode="horizontal"
            background-color="#333333"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="position: fixed; top: 0; left: 0; width: 100%; z-index: 19999; display: flex;
    justify-content: space-between;"
    >
        <div style="color: #fff; font-size: 24px; margin-left: 10px; line-height: 57px;">
            图片像素放大工具
        </div>
        <el-button type="warning" @click="startProcessImages" :loading="processing" style="float: right; margin-top: 13px; margin-right: 20px;">处理图片</el-button>
        <el-button v-if="lastOutputDir" type="info" @click="openOutputDir" style="float: right; margin-top: 13px; margin-right: 20px;">打开输出目录</el-button>
    </el-menu>
    <div style="margin-top: 78px;">
        <div style="padding: 10px; margin-top: 60px;">
            <el-row>
                <el-col :span="24">
                    <el-input
                            :rows="3"
                            clearable
                            v-model="export_in_path"
                            type="textarea"
                            placeholder="文件夹目录"
                    />
                </el-col>
            </el-row>
            <el-row v-if="processing">
                <el-col :span="24" style="margin-top: 20px;">
                    <el-progress :percentage="processPercent" :status="processStatus" />
                    <div style="margin-top: 8px; color: #606266; font-size: 13px;">
                        {{ processText }}
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import {ElMessage} from "element-plus"
    import fs from "fs"
    import path from "path"
    export default {
        name: "Index",
        data(){
            return {
                export_in_path: '',
                processing: false,
                processPercent: 0,
                processText: '',
                processStatus: '',
                lastOutputDir: ''
            }
        },
        mounted() {
        },
        methods: {
            collectImages(rootPath){
                const list = []
                const exts = ['.jpg', '.jpeg', '.png']
                const walk = (dir) => {
                    let entries
                    try {
                        entries = fs.readdirSync(dir)
                    } catch (e) {
                        return
                    }
                    entries.forEach(name => {
                        const full = path.join(dir, name)
                        let st
                        try { st = fs.statSync(full) } catch (e) { return }
                        if (st.isDirectory()) {
                            walk(full)
                        } else if (st.isFile()) {
                            const ext = path.extname(name).toLowerCase()
                            if (exts.includes(ext)) {
                                list.push(full)
                            }
                        }
                    })
                }
                walk(rootPath)
                return list
            },
            ensureDir(dir){
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true })
                }
            },
            resizeImageToBuffer(img, targetPixels){
                return new Promise((resolve, reject) => {
                    const ow = img.naturalWidth
                    const oh = img.naturalHeight
                    if (!ow || !oh) {
                        reject(new Error('无法获取图片尺寸'))
                        return
                    }
                    const current = ow * oh
                    let nw = ow
                    let nh = oh
                    if (current < targetPixels) {
                        const k = Math.sqrt(targetPixels / current)
                        nw = Math.round(ow * k)
                        nh = Math.round(oh * k)
                        if (nw * nh < targetPixels) {
                            nw += 1
                            nh += 1
                        }
                    }
                    const canvas = document.createElement('canvas')
                    canvas.width = nw
                    canvas.height = nh
                    const ctx = canvas.getContext('2d')
                    ctx.imageSmoothingEnabled = true
                    ctx.imageSmoothingQuality = 'high'
                    ctx.drawImage(img, 0, 0, nw, nh)
                    canvas.toBlob((blob) => {
                        if (!blob) {
                            reject(new Error('生成图像失败'))
                            return
                        }
                        const reader = new FileReader()
                        reader.onload = () => resolve(Buffer.from(reader.result))
                        reader.onerror = () => reject(new Error('读取Blob失败'))
                        reader.readAsArrayBuffer(blob)
                    }, 'image/jpeg', 0.993)
                })
            },
            loadImageFromPath(filePath){
                return new Promise((resolve, reject) => {
                    const url = 'atom:///' + filePath.replace(/\\/g, '/')
                    const img = new Image()
                    img.onload = () => resolve(img)
                    img.onerror = (e) => reject(new Error('图片加载失败: ' + filePath))
                    img.src = url
                })
            },
            async processSingleImage(filePath, outputDir, rootDir){
                const ext = path.extname(filePath).toLowerCase()
                const relative = path.relative(rootDir, filePath)
                const outPath = path.join(outputDir, relative)
                this.ensureDir(path.dirname(outPath))

                let originalBuffer = null
                try {
                    originalBuffer = fs.readFileSync(filePath)
                } catch (e) {}

                let img
                try {
                    img = await this.loadImageFromPath(filePath)
                } catch (e) {
                    fs.copyFileSync(filePath, outPath)
                    return { action: 'copy', reason: 'load_fail' }
                }

                const ow = img.naturalWidth
                const oh = img.naturalHeight
                if (!ow || !oh) {
                    fs.copyFileSync(filePath, outPath)
                    return { action: 'copy', reason: 'size_fail' }
                }
                const current = ow * oh
                const target = 20000000
                if (current >= target) {
                    fs.copyFileSync(filePath, outPath)
                    return { action: 'copy', reason: 'big_enough', pixels: current }
                }
                if (ext === '.png') {
                    fs.copyFileSync(filePath, outPath)
                    return { action: 'copy', reason: 'png_skip' }
                }
                try {
                    const buf = await this.resizeImageToBuffer(img, target)
                    let finalBuffer = buf
                    if (originalBuffer && (ext === '.jpg' || ext === '.jpeg')) {
                        const exifApp1 = this.extractExifApp1(originalBuffer)
                        if (exifApp1) {
                            finalBuffer = this.insertExifToJpeg(buf, exifApp1)
                        }
                    }
                    const jpgOut = outPath.replace(/\.[^.]+$/, '.jpg')
                    fs.writeFileSync(jpgOut, finalBuffer)
                    return { action: 'resize' }
                } catch (e) {
                    fs.copyFileSync(filePath, outPath)
                    return { action: 'copy', reason: 'resize_fail' }
                }
            },
            extractExifApp1(buffer){
                const data = new Uint8Array(buffer)
                if (data[0] !== 0xFF || data[1] !== 0xD8) return null
                let offset = 2
                while (offset < data.length - 4) {
                    if (data[offset] !== 0xFF) return null
                    const marker = data[offset + 1]
                    if (marker === 0xD8 || marker === 0xD9) {
                        offset += 2
                        continue
                    }
                    const segLen = (data[offset + 2] << 8) | data[offset + 3]
                    if (marker === 0xE1) {
                        return data.slice(offset, offset + 2 + segLen)
                    }
                    offset += 2 + segLen
                }
                return null
            },
            insertExifToJpeg(jpegBuffer, exifApp1){
                const data = new Uint8Array(jpegBuffer)
                if (data[0] !== 0xFF || data[1] !== 0xD8) return jpegBuffer
                const newBuffer = new Uint8Array(data.length + exifApp1.length)
                newBuffer[0] = 0xFF
                newBuffer[1] = 0xD8
                newBuffer.set(exifApp1, 2)
                newBuffer.set(data.slice(2), 2 + exifApp1.length)
                return Buffer.from(newBuffer)
            },
            async startProcessImages(){
                if (this.processing) return
                const src = (this.export_in_path || '').trim()
                if (!src) {
                    ElMessage.warning('请先填写文件夹目录')
                    return
                }
                if (!fs.existsSync(src)) {
                    ElMessage.error('目录不存在: ' + src)
                    return
                }
                const st = fs.statSync(src)
                if (!st.isDirectory()) {
                    ElMessage.error('请输入文件夹目录，而不是文件')
                    return
                }
                const images = this.collectImages(src)
                if (!images.length) {
                    ElMessage.warning('未在该目录及其子目录下找到 jpg/jpeg/png 图片')
                    return
                }
                const parent = path.dirname(src)
                const baseName = path.basename(src)
                const outputDir = path.join(parent, baseName + '_像素放大处理')
                this.ensureDir(outputDir)

                this.processing = true
                this.processPercent = 0
                this.processStatus = ''
                this.lastOutputDir = outputDir
                let done = 0
                let successCnt = 0
                let copyCnt = 0
                for (const fp of images) {
                    this.processText = `处理中: ${path.relative(src, fp) || path.basename(fp)}`
                    try {
                        const r = await this.processSingleImage(fp, outputDir, src)
                        if (r.action === 'resize') successCnt++
                        else copyCnt++
                    } catch (e) {
                        console.error(e)
                    }
                    done++
                    this.processPercent = Math.min(100, Math.round((done / images.length) * 100))
                }
                this.processText = `完成！共 ${images.length} 张，放大处理 ${successCnt} 张，直接复制 ${copyCnt} 张`
                this.processStatus = 'success'
                this.processing = false
                ElMessage({ type: 'success', message: `图片处理完成，输出目录: ${outputDir}`, offset: 200 })
            },
            openOutputDir(){
                if (!this.lastOutputDir) return
                try {
                    const { shell } = require('electron')
                    if (shell && shell.openPath) {
                        shell.openPath(this.lastOutputDir)
                    } else {
                        ElMessage.info('请手动打开: ' + this.lastOutputDir)
                    }
                } catch (e) {
                    ElMessage.info('请手动打开: ' + this.lastOutputDir)
                }
            },
        }
    }
</script>
<style scoped lang="scss">
</style>

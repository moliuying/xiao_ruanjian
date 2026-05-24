<template>
    <el-menu
            mode="horizontal"
            background-color="#333333"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="position: fixed; top: 0; left: 0; width: 100%; z-index: 1; display: flex;
    justify-content: space-between;"
    >
        <div style="color: #fff; font-size: 24px; margin-left: 10px; line-height: 57px;">
            相册导出
        </div>
        <div>
            <!--            {{text4}}-->
<!--            <el-upload ref="upload" action="" :before-upload="test" :show-file-list="false" style="vertical-align: middle;display: inline-block; margin-left: 15px; margin-top: 10px;">-->
<!--                <el-button  type="primary"   >测试</el-button>-->
<!--            </el-upload>-->


<!--            <el-upload ref="upload" action="" :before-upload="export_excel_in1" :show-file-list="false" style="vertical-align: middle;display: inline-block; margin-left: 15px; margin-top: 10px;">-->
<!--                <el-button  type="primary"   >导入原始数据</el-button>-->
<!--            </el-upload>-->
<!--            <el-upload ref="upload" action="" :before-upload="export_excel_in2" :show-file-list="false" style="vertical-align: middle;display: inline-block; margin-left: 15px;  margin-top: 10px;">-->
<!--                <el-button  type="primary"   >导入文本2</el-button>-->
<!--            </el-upload>-->
            <el-menu-item index="start" style="float: right;">
                <el-button type="primary" @click="trans">开始导出</el-button>
            </el-menu-item>
<!--            <el-menu-item index="start" style="float: right;">-->
<!--                <el-button type="success" @click="copy">复制结果</el-button>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="start" style="float: right;">-->
<!--                <el-button type="warning" @click=" text1 = ''; text3 = ''">清空</el-button>-->
<!--            </el-menu-item>-->
        </div>

    </el-menu>
    <div style="padding: 10px; height: 100%; padding: 10px; margin-top: 60px;">
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
        <el-row>
<!--            <el-col :span="24" style="margin-top: 20px;">-->
<!--                <el-input-->
<!--                        clearable-->
<!--                        v-model="user"-->
<!--                        placeholder="请填写拍摄者"-->
<!--                />-->
<!--            </el-col>-->
        </el-row>
    </div>
    <!--    <el-dialog v-model="dialogTableVisible" title="用户登录" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">-->
    <!--        <el-form ref="form" :model="form" :rules="rules" label-width="100px" :inline="true" style="margin: 0;">-->
    <!--            <el-form-item label="手机号" prop="cellphone" style=" width: 100%">-->
    <!--                <el-input v-model="form.cellphone" placeholder="请输入手机号" clearable />-->
    <!--            </el-form-item>-->
    <!--            <el-form-item label="密码" prop="password" style=" width: 100%">-->
    <!--                <el-input v-model="form.password" type="password" placeholder="请输入密码" clearable />-->
    <!--            </el-form-item>-->
    <!--        </el-form>-->
    <!--        <template #footer>-->
    <!--          <span class="dialog-footer">-->
    <!--&lt;!&ndash;            <el-button @click="state.dialogTableVisible = false">取消</el-button>&ndash;&gt;-->
    <!--            <el-button type="primary" @click=" login ">登录</el-button>-->
    <!--          </span>-->
    <!--        </template>-->
    <!--    </el-dialog>-->
</template>

<script>
    import {ElMessage} from "element-plus";
    let fs = require('fs')
    let path = require('path')
    let moment = require('moment')
    let request = require('request')
    let cheerio = require('cheerio')
    let xlsx = require('node-xlsx')
    // 引入
    // import ExifReader from 'exifreader';
    const exifParser = require('exif-parser')

    const { clipboard } = require('electron')

    // const huanjing_lujing = process.env.NODE_ENV !== 'production' ? __static: process.cwd()
    const huanjing_lujing = process.cwd()
    // const huanjing_lujing =  homedir + `\\Desktop`
    export default {
        name: "Index",
        data(){
            return {
                export_in_path:'',
                user:'',
                arr:[],
            }
        },
        methods:{
            async login(){
                let res = await this.Ajax('login',  this.form)
                if(res){
                    ElMessage({type: 'success', message: '登录成功'})
                    this.dialogTableVisible = false
                }
            },
            async transFolder(src){
                // 图片类型列表
                const imageExtensions = ['jpg', 'jpeg', 'png']
                function isImageFile(file) {
                    const ext = path.extname(file).slice(1);
                    return imageExtensions.includes(ext);
                }
                //读取目录
                // let src =  path.join(this.export_in_path)
                console.log(src)
                let Paths = fs.readdirSync(src, "utf8")
                console.log(Paths)
                for(let item of Paths){
                    let childFlod = path.join(src, item)
                    const stats = fs.statSync(childFlod);
                    if (stats.isFile()) {
                        console.log('这是一个文件');
                        console.log("item",item)
                        if (isImageFile(item.toLowerCase())) {

                            let data = fs.readFileSync(path.join(childFlod))
                            const parser = exifParser.create(data);
                            const result = parser.parse();
                            // console.log(  result.tags,'---'  )
                            // console.log(  result.tags.CreateDate,'---'  )
                            // console.log(  result.tags.DateTimeOriginal,'---'  )
                            // console.log(  result.tags.TimezoneOffset,'---'  )
                            // console.log(  moment(new Date(result.tags.CreateDate * 1000)).subtract(8, 'hours').format('YYYY-MM-DD'),'---'  )
                            console.log("item.split('-')[0],",+(item.split('-')[0]))
                            this.arr.push({
                                title: item,
                                user: this.user,
                                num: +(item.split('-')[0]),
                                time: moment(new Date(result.tags.CreateDate * 1000)).subtract(8, 'hours').format('YYYY-MM-DD')
                            })
                        }
                    } else if (stats.isDirectory()) {
                        console.log('这是一个文件夹 夹夹夹  继续往下查')
                        this.transFolder(childFlod)
                    }
                }
                return this.arr
            },
            async trans(){
                //  /Users/sandy/Downloads/test

                this.arr = []
                let imgs = await this.transFolder(path.join(this.export_in_path))
                console.log(imgs)
                imgs = imgs.sort((a, b) => {
                    return a.num - b.num;
                })
                console.log(imgs)
                let xlsxBuildArr = []
                let data = [
                    ["照片号","题名",'时间','页号','备注']
                ]
                for(let index in imgs){
                    let item = imgs[index]
                    data.push([
                        (+index)+1,
                        item.title,
                        item.time,
                        '',
                        '',
                    ])
                }
                xlsxBuildArr.push({
                    name: "相册信息导出",
                    data
                })
                console.log(xlsxBuildArr)
                let file_name = `${moment().format('YYYY_MM_DD_HH_mm_ss')}.xlsx`
                let buffer = xlsx.build(xlsxBuildArr);
                const os = require('os');
                const homedir = os.homedir();


                if (!fs.existsSync(path.join(homedir, '桌面'))) {
                    console.log( path.join(homedir, 'Desktop', file_name) ,'------')
                    fs.writeFileSync( path.join(homedir, 'Desktop', file_name), buffer, {'flag': 'w'} );
                    ElMessage({ type: 'success', message:  path.join(homedir, 'Desktop', file_name)+ ' 相册信息导出成功',offset: 200 })
                } else {
                    console.log( path.join(homedir, '桌面', file_name) ,'------')
                    fs.writeFileSync( path.join(homedir, '桌面', file_name), buffer, {'flag': 'w'} );
                    ElMessage({ type: 'success', message:  path.join(homedir, '桌面', file_name)+  ' 相册信息导出成功',offset: 200 })
                }

            },
            openDir(){
                function execute(command, callback) {
                    exec(command, (error, stdout, stderr) => {
                        callback(stdout);
                    })
                }
                execute(`explorer  ${ path.join(process.cwd(), `resources/app`)}`, (output) => {
                    ElMessage({type: 'success', message: '存储目录打开成功'})
                })
            }
        }
    }
</script>

<style scoped>
    /*::v-deep .el-form-item__label {*/
    /*    color: #fff !important;*/
    /*}*/
    /*.el-message{*/
    /*    top: 220px !important;*/
    /*}*/
    /*::v-deep .el-message{*/
    /*    top: 220px !important;*/
    /*}*/
</style>

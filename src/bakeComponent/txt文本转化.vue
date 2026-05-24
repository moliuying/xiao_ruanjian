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
            数据处理软件
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
                const imageExtensions = ['pdsf', 'jpeg', 'png']
                function isImageFile(file) {
                    const ext = path.extname(file).slice(1);
                    return imageExtensions.includes(ext);
                }
                //读取目录
                // let src =  path.join(this.export_in_path)
                console.log(src)
                let Paths = fs.readdirSync(src, "utf8")
                console.log(Paths)
                for(let index in Paths){
                    let item = Paths[index]

                    let childFlod = path.join(src, item)
                    const stats = fs.statSync(childFlod);
                    if (stats.isFile()) {
                        // console.log('这是一个文件');
                        // console.log("item",item)
                        if (isImageFile(item.toLowerCase())) {
                            let newStr =  ``
                            let data = fs.readFileSync(path.join(childFlod),'utf8')
                            let arr = data.split('\r\n')
                            let start = false
                            let startIndex = 10000000000000000000000000000
                            let over = false
                            for(let index in arr){
                                let str = arr[index]
                                if(str.includes('Time')){
                                    start = true
                                    startIndex = index
                                }
                                // console.log(str,start)
                                if(str.includes('NUM_DATA_ROWS')){
                                    start = false
                                    over = true
                                    break
                                }
                                if(!over){
                                    if(start){
                                        // let lineArr = str.substr('\t')
                                        // console.log(lineArr)
                                        // console.log(str)
                                        console.log("index---",index)
                                        console.log("startIndex---",startIndex)
                                        let arr  = str.split('\t')
                                        if( +index > +startIndex){
                                            arr[1] = 1
                                        }
                                        console.log(arr[1])
                                        newStr += arr.join('\t') +'\r\n'
                                    }else{
                                        newStr += str +'\r\n'
                                    }
                                }
                            }


                            let  newStr2 = ``
                            let start2 = false
                            let substr = false
                            for(let str of arr){
                                if(str.includes('NUM_DATA_ROWS')){
                                    start2 = true
                                }
                                if( str.includes('END_HEADER') ){
                                    substr = false
                                }
                                if(start2 && !substr){
                                    // 进行拼接
                                    newStr2 += str+'\r\n'
                                }
                                if( str.includes('LOGISTICS_1') ){
                                    substr = true
                                }
                            }
                            // console.log(newStr)
                            // console.log(newStr2)
                            let path1 = path.join(src, 'temp1')
                            let path2 = path.join(src, 'temp2')
                            let path3 = path.join(src, 'temp3')
                            let path4 = path.join(src, '导出结果')
                            if (!fs.existsSync(path1)) {
                                fs.mkdirSync( path1 )
                            }
                            if (!fs.existsSync(path2)) {
                                fs.mkdirSync( path2 )
                            }
                            if (!fs.existsSync(path3)) {
                                fs.mkdirSync( path3 )
                            }
                            if (!fs.existsSync(path4)) {
                                fs.mkdirSync( path4 )
                            }
                            fs.writeFileSync( path.join(path1, item),  newStr)
                            fs.writeFileSync( path.join(path2, item),  newStr2)
                            // 进行一个整合
                            let size1 = fs.statSync( path.join(path1, item) ).size
                            // console.log(size1)
                            // 把第一个size 更改对

                            let data1 = fs.readFileSync( path.join(path1, item),'utf8')
                            let arr1 = data1.split('\r\n')
                            // console.log(path.join(path1, item))
                            // console.log(arr1)
                            let newStr11 = ``
                            for(let str of arr1){
                                // console.log(str)
                                if(str){
                                    if(str.includes('HEADER_OFFSET')){
                                        let arr2  = str.split('\t')
                                        arr2[1] = (size1+'').padStart(9, '0')
                                        newStr11 += arr2.join('\t') +'\r\n'
                                    }else{
                                        newStr11 += str +'\r\n'
                                    }
                                }
                            }
                            // console.log(newStr11)
                            // console.log(123)
                            let data3 = fs.readFileSync( path.join(path2, item),'utf8')
                            fs.writeFileSync( path.join(path3, item),  newStr11+data3)

                            let size2 = fs.statSync( path.join(path3, item) ).size
                            // console.log(size2)
                            let data33 = fs.readFileSync( path.join(path3, item),'utf8')
                            let arr3 = data33.split('\r\n')
                            let newStr22 = ``
                            for(let str of arr3){
                                if(str){
                                    if(str.includes('END_OFFSET')){
                                        let arr2  = str.split('\t')
                                        arr2[1] = ((size2-2)+'').padStart(9, '0')
                                        newStr22 += arr2.join('\t') +'\r\n'
                                    }else{
                                        newStr22 += str +'\r\n'
                                    }
                                }
                            }
                            // console.log(newStr22)
                            fs.writeFileSync( path.join(path4, item), newStr22)
                        }
                    }
                }
                return this.arr
            },
            async trans(){
                //  /Users/sandy/Downloads/test

                this.arr = []
                let imgs = await this.transFolder(path.join(this.export_in_path))
                console.log(imgs)
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

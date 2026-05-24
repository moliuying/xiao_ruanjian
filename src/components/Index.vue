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
            数据转换软件
        </div>
        <el-button type="primary" @click="trans_two" style="float: right; margin-top: 13px; margin-right: 20px;">导出2合1</el-button>
        <el-button type="primary" @click="trans_four" style="float: right; margin-top: 13px; margin-right: 20px;">导出4合1</el-button>
        <el-button type="success" @click="exportTxt" style="float: right; margin-top: 13px; margin-right: 20px;">提取目录信息</el-button>
        <el-button type="success" @click="exportExcel" style="float: right; margin-top: 13px; margin-right: 20px;">导出目录</el-button>
        <el-button type="success" @click="export_input" style="float: right; margin-top: 13px; margin-right: 20px;">导出标签</el-button>
        <el-button type="warning" @click="openEnhancedDir" :disabled="!enhanced_output_dir" style="float: right; margin-top: 13px; margin-right: 20px;">打开处理后目录</el-button>
        <el-button type="warning" @click="enhanceImages" :loading="enhancing" style="float: right; margin-top: 13px; margin-right: 20px;">图片像素扩展</el-button>

<!--        <el-button type="warning" @click="exportTxt" style="float: right; margin-top: 13px; margin-right: 20px;">导出相册目录</el-button>-->
<!--        <el-button type="primary" @click="trans_two" style="float: right; margin-top: 13px; margin-right: 20px;">导出2合1</el-button>-->
<!--        <el-button type="success" @click="trans_four" style="float: right; margin-top: 13px; margin-right: 20px;">导出4合1</el-button>-->
        <!--        <el-button type="success" @click="export_excel_out" style="float: right; margin-top: 13px;">导出</el-button>-->
        <!--        <el-upload style="float: right; margin-top: 13px; margin-right: 10px;" ref="upload" action="" :before-upload="export_excel_in" :show-file-list="false" >-->
        <!--            <el-button  type="primary" >导入</el-button>-->
        <!--        </el-upload>-->
        <!--            <el-menu-item index="start" style="float: right;">-->
        <!--                <el-button type="warning" @click=" prevTextarea = ''; nowTextarea = ''">清空</el-button>-->
        <!--            </el-menu-item>-->

    </el-menu>
    <div style="margin-top: 78px;">
        <!--本人亲测，绝对管用的长度和高度像素大小为：width:794px;height:1090px;-->
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
                <el-col :span="24" style="margin-top: 20px;">
                    <el-input
                            clearable
                            v-model="user"
                            placeholder="请填写拍摄者"
                    />
                </el-col>
            </el-row>
            <el-row v-if="enhance_progress.visible">
                <el-col :span="24" style="margin-top: 20px;">
                    <el-progress :percentage="enhance_progress.percent" :status="enhance_progress.status">
                        <template #default>
                            <span style="color: #606266; font-size: 14px;">
                                {{ enhance_progress.text }}
                            </span>
                        </template>
                    </el-progress>
                </el-col>
            </el-row>
        </div>
        <div id="two"   style="
            width: calc(1570px);
            height: calc(2025px);
            padding: 85px 165px 175px 130px;
            margin: 0 auto;
            overflow: hidden;
            box-sizing: border-box;">
<!--            <template v-for="item in subArrTwo" >-->
<!--                <img  v-if="item" :key="item" style="height: 50%; width: 100%;" :src="item" alt="">-->
<!--            </template>-->
<!--            <span v-for="item in subArrTwo" style="height: 50%; width: 100%; display: inline-block; border: 2px solid #000;"  :key="item">-->
<!--                <img  v-if="item" :key="item" :src="item"  style="height: 100%; width: 100%;">-->
<!--            </span>-->

            <span v-for="item in subArrTwo" style="height: 50%; width: 100%;
             display: inline-flex; /* 使用flex布局 */
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
            overflow: hidden; /* 隐藏溢出的内容 */
             border: 2px solid #000;"  :key="item">
                <img  v-if="item" :key="item" :src="item"  style="
    max-width: 100%; /* 图片最大宽度为100% */
    max-height: 100%; /* 图片最大高度为100% */
    object-fit: contain; /* 缩放图片以完全显示在容器内 */
    object-position: center; /* 图片居中显示 */
">
            </span>
        </div>

        <div id="four" style="
            width: calc(1430px);
            height: calc(2120px);
            padding: 72px 84px 140px 52px;
            margin: 0 auto;
            position: relative;
            margin-top: 10px;
            box-sizing: border-box;">
<!--            <template v-for="item in subArrFour" >-->
<!--                <img v-if="item" :key="item"  :src="item" alt="">-->
<!--            </template>-->

            <div  v-for="item in subArrFour" :key="item">
                 <img v-if="item" :key="item"  :src="item"  style="
    max-width: 100%; /* 图片最大宽度为100% */
    max-height: 100%; /* 图片最大高度为100% */
    object-fit: contain; /* 缩放图片以完全显示在容器内 */
    object-position: center; /* 图片居中显示 */
"/>
            </div>
        </div>


        <!--        <div v-for="(subArr,index) in twoArrs" :key="subArr">-->
        <!--            <div :id="'two'+index"   style="-->
        <!--            width: calc(844px*2);-->
        <!--            height: calc(1176px*2);-->
        <!--            padding: 48px 88px 128px 56px;-->

        <!--            margin: 0 auto;-->
        <!--            overflow: hidden;-->
        <!--            box-sizing: border-box;">-->
        <!--                <template v-for="item in subArr" >-->
        <!--                    <img  v-if="item" :key="item" style="height: 50%; width: 100%;" :src="item" alt="">-->
        <!--                </template>-->
        <!--            </div>-->
        <!--        </div>-->

        <!--        <div v-for="(subArr,index) in fourArrs" :key="subArr" id="four">-->
        <!--            <div :id="'four'+index"  style="-->
        <!--            width: calc(840px*2);-->
        <!--            height: calc(2150px);-->
        <!--            padding: 72px 84px 140px 52px;-->

        <!--            margin: 0 auto;-->
        <!--            position: relative;-->
        <!--            margin-top: 10px;-->
        <!--            box-sizing: border-box;">-->
        <!--                &lt;!&ndash;                <p v-for="item in subArr" :key="item" :style="{backgroundImage: 'url(' + item + ')'}" >&ndash;&gt;-->
        <!--                &lt;!&ndash;&lt;!&ndash;                    <img  :src="item" alt="">&ndash;&gt;&ndash;&gt;-->
        <!--                &lt;!&ndash;                </p>&ndash;&gt;-->
        <!--                <template v-for="item in subArr" >-->
        <!--                    <img v-if="item" :key="item"  :src="item" alt="">-->
        <!--                    &lt;!&ndash;                    <img v-if="item" :key="item"  src="@/assets/bg.jpeg" alt="">&ndash;&gt;-->
        <!--                </template>-->

        <!--            </div>-->
        <!--        </div>-->
    </div>


    <!--    <el-dialog v-model="lookResultModal" title="解析结果" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">-->
    <!--        <el-table-->
    <!--                border-->
    <!--                :data="resultData"-->
    <!--                style="width: 100%">-->
    <!--            <el-table-column label="一" width="80" header-align="center" align="left">-->
    <!--                <template #default="scope"> <el-input v-model="scope.row[0]" style="text-align: center;"  /> </template>-->
    <!--            </el-table-column>-->
    <!--            <el-table-column label="二" width="80" header-align="center" align="left">-->
    <!--                <template #default="scope"> <el-input v-model="scope.row[1]" /> </template>-->
    <!--            </el-table-column>-->
    <!--            <el-table-column label="三" width="80" header-align="center" align="left">-->
    <!--                <template #default="scope"> <el-input v-model="scope.row[2]" /> </template>-->
    <!--            </el-table-column>-->
    <!--            <el-table-column label="四" width="80" header-align="center" align="left">-->
    <!--                <template #default="scope"> <el-input v-model="scope.row[3]" /> </template>-->
    <!--            </el-table-column>-->
    <!--        </el-table>-->
    <!--        <template #footer>-->
    <!--              <span class="dialog-footer">-->
    <!--    &lt;!&ndash;            <el-button @click="state.dialogTableVisible = false">取消</el-button>&ndash;&gt;-->
    <!--                <el-button type="primary" @click=" lookResultModal = false ">查看完毕</el-button>-->
    <!--              </span>-->
    <!--        </template>-->
    <!--    </el-dialog>-->
</template>
<script>
    import {ElMessage} from "element-plus"
    import fs from "fs"
    import path from "path"
    import moment from "moment"
    let xlsx = require('node-xlsx')
    import html2canvas from 'html2canvas'
    const Jimp = require('jimp')
    const imageSize = require('image-size')
    const {shell} = require('electron')
    // const huanjing_lujing = process.env.NODE_ENV !== 'production' ? __static: process.cwd()

    const os = require('os');
    const homedir = os.homedir();
    // console.log(homedir,'homedir')
    // const huanjing_lujing =  homedir + `\\Desktop`
    // const huanjing_lujing =  homedir
    const huanjing_lujing =  process.cwd()
    const exifParser = require('exif-parser')
    export default {
        name: "Index",
        data(){
            return {
                export_in_path:'',
                user:'',
                subArrTwo: [],
                subArrFour: [],
                twoArrs: [],
                fourArrs: [],
                fileArr:[],
                enhancing: false,
                enhanced_output_dir: '',
                enhance_progress: {
                    visible: false,
                    percent: 0,
                    status: '',
                    text: ''
                }
            }
        },
        mounted() {
            console.log("process.env.NODE_ENV",process.env.NODE_ENV )
            console.log("huanjing_lujing",huanjing_lujing)

            if(!fs.existsSync( path.join( huanjing_lujing, `软件资料`) )){
                fs.mkdirSync( path.join(huanjing_lujing, `软件资料`) )
            }
            if(!fs.existsSync( path.join(huanjing_lujing, `软件资料`, `导出相册目录`) )){
                fs.mkdirSync( path.join(huanjing_lujing, `软件资料`, `导出相册目录`) )
            }
            if(!fs.existsSync( path.join(huanjing_lujing, `软件资料`, `导出合成图片`) )){
                fs.mkdirSync( path.join(huanjing_lujing, `软件资料`, `导出合成图片`) )
            }
            if(!fs.existsSync( path.join(huanjing_lujing, `软件资料`, `原始文件总目录`) )){
                fs.mkdirSync( path.join(huanjing_lujing, `软件资料`, `原始文件总目录`) )
            }
        },
        methods: {
            liClick() {
                this.step++
            },
            getAllImgFile(src){
                let paths = fs.readdirSync(src)
                paths.forEach( (path) =>{
                    var _src = src + '/' +path
                    let stat = fs.statSync(_src)
                    if(stat.isFile()) {
                        this.fileArr.push(_src)
                    } else if(stat.isDirectory()) {
                        this.getAllImgFile(_src)
                    }
                })
            },
            // getAllFileNum2(src,num) {
            //     let paths = fs.readdirSync(src)
            //     if(num == 1){
            //         // var imageUrl = '/软件资料/原始文件总目录/'
            //         // if(paths.length == 4){
            //         //     this.fourArrs.push(paths.map(item=>  imageUrl + src.split('/')[ src.split('/').length - 1 ] +'/' +item  ))
            //         // }
            //
            //         // var imageUrl = '../软件资料/原始文件总目录/'
            //         var imageUrl = '../软件资料/原始文件总目录/'
            //         if(paths.length == 4){
            //             this.fourArrs.push(paths.map(item=>  imageUrl + src.split('/')[ src.split('/').length - 1 ] +'/' +item  ))
            //         }
            //     }
            //     paths.forEach( (path) =>{
            //         var _src = src + '/' +path
            //         let stat = fs.statSync(_src)
            //         if(stat.isFile()) {
            //             this.fileArr.push(_src)
            //         } else if(stat.isDirectory()) {
            //             this.getAllFileNum2(_src,1)
            //         }
            //     })
            // },
            // getAllFileNum1(src,num) {
            //     let paths = fs.readdirSync(src)
            //     if(num == 1){
            //         var imageUrl = '../软件资料/原始文件总目录/'
            //         if(paths.length == 2){
            //             this.twoArrs.push(paths.map(item=>  imageUrl + src.split('/')[ src.split('/').length - 1 ] +'/' + item ))
            //         }
            //     }
            //     paths.forEach( (path) =>{
            //         var _src = src + '/' +path
            //         let stat = fs.statSync(_src)
            //         if(stat.isFile()) {
            //             this.fileArr.push(_src)
            //         } else if(stat.isDirectory()) {
            //             this.getAllFileNum1(_src,1)
            //         }
            //     })
            // },
            exportImg(imgDom){
                console.log(imgDom)
                this.$nextTick(() => {
                    // 获取要转换的元素
                    // const imgDom = this.$refs.imgDom
                    // 拿到目标dom调用一下html2canvas方法就能生成canvas对象了
                    // 获取要转换的元素
                    html2canvas(imgDom, {
                        useCORS: true // 开启跨域设置，需要后台设置cors
                    }).then((canvas) => {
                        // toDataURL函数生成img标签的可用数据  图片格式转成 base64
                        let base_64_url = canvas.toDataURL("image/png")
                        // console.log(base_64_url)
                        // if(!fs.existsSync( path.join(huanjing_lujing, `resources`) )){
                        //     fs.mkdirSync( path.join(huanjing_lujing, `resources`) )
                        // }
                        // if(!fs.existsSync( path.join(huanjing_lujing, `resources/app`) )){
                        //     fs.mkdirSync( path.join(huanjing_lujing, `resources/app`) )
                        // }
                        // if(!fs.existsSync( path.join(huanjing_lujing, `resources/app/软件资料`) )){
                        //     fs.mkdirSync( path.join(huanjing_lujing, `resources/app/软件资料`) )
                        // }
                        // if(!fs.existsSync( path.join(huanjing_lujing, `resources/app/软件资料/导出合成图片`) )){
                        //     fs.mkdirSync( path.join(huanjing_lujing, `resources/app/软件资料/导出合成图片`) )
                        // }


                        var base64 = base_64_url.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
                        var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
                        fs.writeFile( path.join(huanjing_lujing, `软件资料/导出合成图片`,  `${moment().format('YYYY-MM-DD-HH-mm-ss')}.png`) ,dataBuffer,function(err){//用fs写入文件
                            if(err){
                                console.log(err);
                            }else{
                                console.log('写入成功！');
                                ElMessage({message:  '图片导出成功', grouping: true, type: 'success' })
                            }
                        });
                    })
                })
            },
            trans_four(){
                // this.fourArrs = []
                // this.fileArr = []
                // this.getAllFileNum2( path.join(huanjing_lujing, `软件资料`, '原始文件总目录') )
                // console.log(this.fourArrs)
                // this.$nextTick(() => {
                //     for(let index in this.fourArrs){
                //         let imgDom = window.document.getElementById('four'+index)
                //         this.exportImg(imgDom)
                //     }
                // })


                this.twoArrs = []
                this.fourArrs = []
                this.fileArr = []

                this.getAllImgFile( path.join(huanjing_lujing, `软件资料`, '原始文件总目录') )
                console.log(this.fileArr)
                let arr = []
                this.fileArr.forEach(item=>{
                    // console.log(item)
                    var file_name = item.replace(/(.*\/)*([^.]+).*/ig,function ($,$1,$2,) { return $2 })
                    if(file_name.includes('-')){
                        // var imageUrl = '/软件资料/原始文件总目录/'
                        // arr.push( imageUrl + item.split('/')[ item.split('/').length - 1 ] )
                        // arr.push( path.resolve('/软件资料/原始文件总目录/', item.split('/')[ item.split('/').length - 1 ]) )
                        arr.push( 'atom:///'+item )
                    }
                })
                console.log(arr)
                this.fourArrs =
                    // arr.sort(() => Math.random() > .5) // 打乱
                    arr.map((e, i) => i % 4 ? null : [arr[i], arr[i + 1], arr[i + 2], arr[i + 3]]) // 两两取出
                        .filter(Boolean)
                console.log(this.fourArrs )
                // this.$nextTick(() => {
                //     for(let index in this.fourArrs){
                //         let imgDom = window.document.getElementById('four'+index)
                //         this.exportImg(imgDom)
                //     }
                // })
                //一个一个渲染导出
                this.getOneSubArrToImgFour(this.fourArrs,0)
            },
            trans_two(){
                // this.twoArrs = []
                // // this.fileArr = []
                // this.getAllFileNum1( path.join(huanjing_lujing, `软件资料`, '原始文件总目录') )
                // console.log(this.twoArrs)
                // this.$nextTick(() => {
                //     for(let index in this.twoArrs){
                //         console.log('two'+index)
                //         let imgDom = window.document.getElementById('two'+index)
                //         this.exportImg(imgDom)
                //     }
                // })
                this.twoArrs = []
                this.fourArrs = []
                this.fileArr = []
                this.getAllImgFile( path.join(huanjing_lujing, `软件资料`, '原始文件总目录') )
                console.log(this.fileArr)
                let arr = []
                this.fileArr.forEach(item=>{
                    // console.log(item)
                    var file_name = item.replace(/(.*\/)*([^.]+).*/ig,function ($,$1,$2,) { return $2 })
                    if(file_name.includes('-')){
                        // var imageUrl = '/软件资料/原始文件总目录/'
                        // arr.push( imageUrl + item.split('/')[ item.split('/').length - 1 ] )
                        // arr.push( path.resolve('/软件资料/原始文件总目录/', item.split('/')[ item.split('/').length - 1 ]) )
                        arr.push( 'atom:///'+item )
                    }
                })
                console.log(arr)

                this.twoArrs =
                    // arr.sort(() => Math.random() > .5) // 打乱
                    arr.map((e, i) => i % 2 ? null : [arr[i], arr[i + 1]]) // 两两取出
                        .filter(Boolean)
                console.log(this.twoArrs )

                //一个一个渲染导出
                this.getOneSubArrToImg(this.twoArrs,0)
            },
            getOneSubArrToImgFour(arr,index){
                if(index >= arr.length){
                    ElMessage({message:  '图片全部导出成功', grouping: true, type: 'success' })
                    return
                }
                this.subArrFour = arr[index]
                // return;
                console.log("this.subArrFour",this.subArrFour)
                let imgDom = window.document.getElementById('four')
                this.$nextTick(() => {
                    // 获取要转换的元素
                    // const imgDom = this.$refs.imgDom
                    // 拿到目标dom调用一下html2canvas方法就能生成canvas对象了
                    // 获取要转换的元素

                    console.log(imgDom,"imgDom")
                    html2canvas(imgDom, {
                        useCORS: true // 开启跨域设置，需要后台设置cors
                    }).then((canvas) => {
                        let base_64_url = canvas.toDataURL("image/png")
                        var base64 = base_64_url.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
                        var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
                        fs.writeFile( path.join(huanjing_lujing, `软件资料/导出合成图片`,  `${moment().format('YYYY-MM-DD-HH-mm-ss')}.png`) ,dataBuffer,(err)=>{//用fs写入文件
                            if(err){
                                console.log(err);
                            }else{
                                console.log('写入成功！');
                                ElMessage({message:  '图片导出成功-'+(index+1)+'/'+arr.length, grouping: true, type: 'success' })
                                this.subArrFour = []
                                index++
                                this.getOneSubArrToImgFour(arr,index)
                            }
                        });
                    })
                })
            },
            getOneSubArrToImg(arr,index){
                if(index >= arr.length){
                    ElMessage({message:  '图片全部导出成功', grouping: true, type: 'success' })
                    return
                }
                this.subArrTwo = arr[index]
                console.log("this.subArrTwo",this.subArrTwo)
                let imgDom = window.document.getElementById('two')
                this.$nextTick(() => {
                    // 获取要转换的元素
                    // const imgDom = this.$refs.imgDom
                    // 拿到目标dom调用一下html2canvas方法就能生成canvas对象了
                    // 获取要转换的元素
                    html2canvas(imgDom, {
                        useCORS: true // 开启跨域设置，需要后台设置cors
                    }).then((canvas) => {
                        // toDataURL函数生成img标签的可用数据  图片格式转成 base64
                        let base_64_url = canvas.toDataURL("image/png")
                        // console.log(base_64_url)
                        // if(!fs.existsSync( path.join(huanjing_lujing, `resources`) )){
                        //     fs.mkdirSync( path.join(huanjing_lujing, `resources`) )
                        // }
                        // if(!fs.existsSync( path.join(huanjing_lujing, `resources/app`) )){
                        //     fs.mkdirSync( path.join(huanjing_lujing, `resources/app`) )
                        // }
                        // if(!fs.existsSync( path.join(huanjing_lujing, `resources/app/软件资料`) )){
                        //     fs.mkdirSync( path.join(huanjing_lujing, `resources/app/软件资料`) )
                        // }
                        // if(!fs.existsSync( path.join(huanjing_lujing, `resources/app/软件资料/导出合成图片`) )){
                        //     fs.mkdirSync( path.join(huanjing_lujing, `resources/app/软件资料/导出合成图片`) )
                        // }


                        var base64 = base_64_url.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
                        var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
                        fs.writeFile( path.join(huanjing_lujing, `软件资料/导出合成图片`,  `${moment().format('YYYY-MM-DD-HH-mm-ss')}.png`) ,dataBuffer,(err)=>{//用fs写入文件
                            if(err){
                                console.log(err);
                            }else{
                                console.log('写入成功！');
                                ElMessage({message:  '图片导出成功-'+(index+1)+'/'+arr.length, grouping: true, type: 'success' })
                                this.subArrTwo = []
                                index++
                                this.getOneSubArrToImg(arr,index)
                            }
                        });
                    })
                })
            },
            exportTxt(title,allData){
                let year = moment().format('YYYY')
                let mounth = moment().format('MM')
                let day = moment().format('DD')
                let HH = moment().format('HH')
                let mm = moment().format('mm')
                let ss =moment().format('ss')

                this.fileArr = []
                this.getAllImgFile( path.join(huanjing_lujing, `软件资料`, '原始文件总目录') )
                // console.log(this.fileArr)
                // let map = {}
                // for(let i=1; i<=200; i++){
                //     map['a'+i] = ''
                // }
                let arr = []
                this.fileArr.forEach(item=>{
                    // console.log(item)
                    var file_name = item.replace(/(.*\/)*([^.]+).*/ig,function ($,$1,$2,) { return $2 })
                    if(file_name.includes('-')){
                        arr.push({ name: file_name, index: Number(file_name.split('-')[0]) })
                        // map[ 'a'+Number(file_name.split('-')[0]) ] = file_name.split('-')[1]
                    }
                })
                arr = arr.sort((a,b)=> a.index - b.index).map(item=> item.name)
                console.log(arr)
                // console.log(map)
                // console.log(map)
                // // 引入相关的库
                // var PizZip = require('pizzip');
                // var Docxtemplater = require('docxtemplater');
                // // 读取文件,以二进制文件形式保存
                // var content = fs.readFileSync( path.join(huanjing_lujing, `软件资料`, '相册目录模板.docx'), 'binary');
                // // console.log(content)
                // // // 压缩数据
                // var zip = new PizZip(content);
                // // 生成模板文档
                // var doc = new Docxtemplater(zip);
                // // console.log(doc)
                // // // 设置填充数据
                // doc.setData(map);
                // // // //渲染数据生成文档
                // doc.render()
                // // // 将文档转换文nodejs能使用的buf
                // var buf = doc.getZip().generate({ type: 'nodebuffer' });
                // // // 输出文件
                // fs.writeFileSync(   path.join(huanjing_lujing, `软件资料`, '导出相册目录', year+':'+mounth+':'+day+''+HH+':'+mm+':'+ss+':'+`导出的相册名.docx`), buf);
                fs.writeFileSync( path.join(huanjing_lujing, `软件资料`, '导出相册目录', year+mounth+day+'_'+HH+mm+ss+'.txt'),  arr.join('\r\n') )
                ElMessage({type: 'success', message: '相册目录TXT导出成功',offset: 200})
            },
            getTenNum(n,arr) {
                var result = [];
                var count = arr.length;
                for (var i = 0; i < n; i++) {
                    var index = ~~(Math.random() * count) + i;
                    if(result.includes(arr[index])){
                        continue;
                    }
                    result[i] = arr[index];
                    arr[index] = arr[i];
                    count--;
                }
                return result
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
                            // console.log(result.tags.CreateDate)
                            // console.log(result.tags)
                            // console.log(  moment(new Date(result.tags.CreateDate * 1000)).format('YYYY-MM-DD HH:mm:ss')  )
                            this.arr.push({
                                title: item.replace('.jpg','').replace('.JPG',''),
                                user: this.user,
                                num: item.split('-')[0],
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
            async exportExcel(){
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
            async export_input(){
                //  /Users/sandy/Downloads/test

                let year = moment().format('YYYY')
                let mounth = moment().format('MM')
                let day = moment().format('DD')
                let HH = moment().format('HH')
                let mm = moment().format('mm')
                let ss =moment().format('ss')



                this.arr = []
                let imgs = await this.transFolder(path.join(this.export_in_path))
                console.log(imgs)
                var PizZip = require('pizzip');
                var Docxtemplater = require('docxtemplater');
                // 读取文件,以二进制文件形式保存
                const huanjing_lujing = process.cwd()
                var content = fs.readFileSync( path.join(huanjing_lujing, `resources/app/软件资料`, '声像档案照片标签.docx'), 'binary');
                // console.log(content)
                // // 压缩数据
                var zip = new PizZip(content);
                // 生成模板文档
                var doc = new Docxtemplater(zip);
                // console.log(doc)
                // // 设置填充数据
                // const middleIndex = Math.ceil(arr.length / 2);
                // const firstHalf = arr.splice(0, middleIndex);
                // const secondHalf = arr.splice(-middleIndex);

                doc.setData({
                    list: imgs,
                });
                // // //渲染数据生成文档
                doc.render()
                // // 将文档转换文nodejs能使用的buf
                var buf = doc.getZip().generate({ type: 'nodebuffer' });
                // // 输出文件
                fs.writeFileSync( path.join(huanjing_lujing, `软件资料`, '输入路径导出'+year+mounth+day+'_'+HH+mm+ss+'.docx'),  buf)
                ElMessage({type: 'success', message: '相册信息导出成功',offset: 200})
            },
            collectImages(src, list){
                if(!fs.existsSync(src)) return
                const paths = fs.readdirSync(src)
                const exts = ['jpg', 'jpeg', 'png', 'bmp', 'tif', 'tiff', 'webp']
                paths.forEach(name => {
                    const full = path.join(src, name)
                    const stat = fs.statSync(full)
                    if(stat.isFile()){
                        const ext = path.extname(name).replace('.','').toLowerCase()
                        if(exts.includes(ext)){
                            list.push(full)
                        }
                    } else if(stat.isDirectory()){
                        this.collectImages(full, list)
                    }
                })
            },
            openEnhancedDir(){
                if(!this.enhanced_output_dir) {
                    ElMessage({type: 'warning', message: '尚未生成处理后目录', offset: 200})
                    return
                }
                if(!fs.existsSync(this.enhanced_output_dir)){
                    ElMessage({type: 'warning', message: '目录不存在', offset: 200})
                    return
                }
                shell.openPath(this.enhanced_output_dir).then(err => {
                    if(err){
                        ElMessage({type: 'error', message: '打开目录失败: ' + err, offset: 200})
                    }
                })
            },
            async enhanceImages(){
                if(this.enhancing) return
                const src = (this.export_in_path || '').trim()
                if(!src){
                    ElMessage({type: 'warning', message: '请先填写文件夹目录', offset: 200})
                    return
                }
                if(!fs.existsSync(src)){
                    ElMessage({type: 'error', message: '目录不存在', offset: 200})
                    return
                }
                const TARGET_PX = 20000000
                const parent = path.dirname(src)
                const base = path.basename(src)
                const outputRoot = path.join(parent, base + '_像素扩展')
                if(!fs.existsSync(outputRoot)){
                    fs.mkdirSync(outputRoot, {recursive: true})
                }
                this.enhanced_output_dir = outputRoot
                this.enhancing = true
                this.enhance_progress = { visible: true, percent: 0, status: '', text: '正在扫描图片...' }
                try {
                    const images = []
                    this.collectImages(src, images)
                    if(images.length === 0){
                        ElMessage({type: 'info', message: '未找到图片', offset: 200})
                        this.enhance_progress = { visible: false, percent: 0, status: '', text: '' }
                        this.enhancing = false
                        return
                    }
                    this.enhance_progress.text = `共 ${images.length} 张图片，开始处理...`
                    let done = 0
                    let upsized = 0
                    let copied = 0
                    for(const imgPath of images){
                        try {
                            const relPath = path.relative(src, imgPath)
                            const outPath = path.join(outputRoot, relPath)
                            const outDir = path.dirname(outPath)
                            if(!fs.existsSync(outDir)){
                                fs.mkdirSync(outDir, {recursive: true})
                            }
                            const dims = imageSize(imgPath)
                            if(!dims || !dims.width || !dims.height){
                                fs.copyFileSync(imgPath, outPath)
                                copied++
                            } else {
                                const w = dims.width
                                const h = dims.height
                                const curPx = w * h
                                if(curPx >= TARGET_PX){
                                    fs.copyFileSync(imgPath, outPath)
                                    copied++
                                } else {
                                    const ratio = Math.sqrt(TARGET_PX / curPx)
                                    const newW = Math.ceil(w * ratio)
                                    const newH = Math.ceil(h * ratio)
                                    const image = await Jimp.read(imgPath)
                                    image.resize(newW, newH, Jimp.RESIZE_BICUBIC)
                                    await image.writeAsync(outPath)
                                    upsized++
                                }
                            }
                        } catch (e) {
                            console.error('处理图片失败', imgPath, e)
                        }
                        done++
                        const percent = Math.floor((done / images.length) * 100)
                        this.enhance_progress.percent = percent
                        this.enhance_progress.status = percent >= 100 ? 'success' : ''
                        this.enhance_progress.text = `处理进度 ${done}/${images.length}  扩展:${upsized}  复制:${copied}`
                    }
                    this.enhance_progress.text = `处理完成  共${images.length}张  扩展:${upsized}  复制:${copied}`
                    this.enhance_progress.status = 'success'
                    ElMessage({
                        type: 'success',
                        message: `处理完成 共${images.length}张 扩展:${upsized} 复制:${copied}`,
                        offset: 200
                    })
                } catch (err) {
                    console.error(err)
                    this.enhance_progress.status = 'exception'
                    this.enhance_progress.text = '处理出错: ' + (err && err.message ? err.message : err)
                    ElMessage({type: 'error', message: '处理出错', offset: 200})
                } finally {
                    this.enhancing = false
                }
            },
        }
    }
</script>
<style scoped lang="scss">
    #two>span:nth-child(2n){
        margin-top: 4px;
    }
    #four{
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        /*justify-content: space-between;*/

        /*width: 800px;*/
        /*height: 1100px;*/

        /*width: 800px;*/
        /*height: 1100px;*/
        /*margin: 0 auto;*/
        /*border: 1px solid red;*/
        div{
            /*height: 348px;*/
            /*width: 500px;*/
            height: calc( 626px );
            width:  calc( 900px );
            transform: rotate(-90deg) translate(-154px, -134px);
            position: absolute;
            left: 70px;
            top: 136px;

            display: flex; /* 使用flex布局 */
            justify-content: center;
            align-items: center;
            border: 2px solid #000;
            /*background: red;*/
        }
        div:nth-child(2){
            left: 704px;
        }
        div:nth-child(3){
            top: 1054px;
            top: 1054px;
        }
        div:nth-child(4){
            left: 704px;
            top: 1054px;
        }
        /*p{
            height: 398px;
            width: 548px;
            transform: rotate(-90deg);
            float: left;
            !*img{*!

            !*    !*width: 100%;*!*!
            !*    !*height: 100%;*!*!

            !*    width: 398px;*!
            !*    height: 548px;*!

            !*    !*width: 550px;*!*!
            !*    !*height: 400px;*!*!
            !*}*!
        }*/

        /*<!--img:nth-child(1),img:nth-child(2){-->*/
        /*<!--    margin-bottom: 150px;-->*/
        /*<!--}-->*/
        /*<!--img:nth-child(1),img:nth-child(3){-->*/
        /*<!--    margin-left: 22px;-->*/
        /*<!--}-->*/
        /*<!--img:nth-child(2),img:nth-child(4){-->*/
        /*<!--    margin-left: -144px;-->*/
        /*<!--}-->*/
    }
    /*.box{*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    background-repeat: no-repeat;*/
    /*    background-size: 100% 100%;*/
    /*    text-align: center;*/
    /*    padding-top: 12%;*/
    /*    box-sizing: border-box;*/
    /*    .title1{*/
    /*        color: #fff;*/
    /*        font-size: 35px;*/
    /*    }*/
    /*    .title2{*/
    /*        color: #fff;*/
    /*        font-size: 60px;*/
    /*        font-weight: bold;*/
    /*    }*/

    /*    .content{*/
    /*        display: flex;*/
    /*        align-items: center;*/
    /*        justify-content: center;*/
    /*        margin-top: 30px;*/
    /*        .innerConnet{*/
    /*            width: 500px;*/
    /*            background: rgba(255,255,255,0.2);*/
    /*            border: 2px solid #fff;*/
    /*            border-radius: 10px;*/
    /*            height: 250px;*/
    /*            padding: 10px;*/
    /*            .innerConnetBox{*/
    /*                width: 100%;*/
    /*                height: 100%;*/
    /*                background: #fff;*/
    /*                border-radius: 10px;*/
    /*                .title{*/
    /*                    background: #005EBE;*/
    /*                    width: 240px;*/
    /*                    height: 60px;*/
    /*                    line-height: 60px;*/
    /*                    color: #fff;*/
    /*                    font-size: 30px;*/
    /*                    border-radius: 0 0 10px 10px;*/
    /*                    margin: 0 auto;*/
    /*                }*/
    /*                .step1{*/
    /*                    ul{*/
    /*                        padding: 0 15px;*/
    /*                        display: flex;*/
    /*                        list-style: none;*/
    /*                        justify-content: space-between;*/
    /*                        li{*/
    /*                            background: #f2f2f2;*/
    /*                            height: 60px;*/
    /*                            width: 45%;*/
    /*                            cursor: pointer;*/
    /*                            flex-wrap: wrap;*/
    /*                            line-height: 60px;*/
    /*                            color: #005EBE;*/
    /*                            font-size: 26px;*/
    /*                            border-radius: 30px;*/
    /*                        }*/
    /*                    }*/
    /*                }*/
    /*                .step2{*/
    /*                    .back{*/
    /*                        color: #808080;*/
    /*                        font-size: 26px;*/
    /*                        text-align: right;*/
    /*                        padding-right: 20px;*/
    /*                        cursor: pointer;*/
    /*                    }*/
    /*                    ul{*/
    /*                        padding: 0 15px;*/
    /*                        display: flex;*/
    /*                        list-style: none;*/
    /*                        justify-content: space-between;*/
    /*                        margin-top: 50px;*/
    /*                        li{*/
    /*                            background: #f2f2f2;*/
    /*                            height: 80px;*/
    /*                            width: 32%;*/
    /*                            cursor: pointer;*/
    /*                            flex-wrap: wrap;*/
    /*                            line-height: 80px;*/
    /*                            color: #005EBE;*/
    /*                            font-size: 30px;*/
    /*                            border-radius: 30px;*/
    /*                        }*/
    /*                    }*/
    /*                }*/
    /*            }*/
    /*            .bumen{*/
    /*                color: #FFF2C7;*/
    /*                text-align: center;*/
    /*                font-size: 26px;*/
    /*                margin-top: 30px;*/
    /*            }*/
    /*        }*/
    /*    }*/
    /*}*/
</style>

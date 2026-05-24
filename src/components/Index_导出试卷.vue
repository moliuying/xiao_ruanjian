<template>
    <div class="box" :style="{'background-image': `url(${require('../assets/bgShaiXuan.jpg')})`}">
        <div class="title1">
            福建福清核电有限公司
        </div>
        <div class="title2">
            运行人员基本功出题软件 <span>v1.3</span>
        </div>
        <div class="content">
            <div class="innerConnet">
                <div class="innerConnetBox">
                    <div class="title">
                        {{ step == 1?'题库选择':'BUP设备定位' }}
                    </div>
                    <div class="step1" v-if="step == 1">
                        <ul>
                            <li @click="liClick(1)">BUP设备定位</li>
                            <li @click="liClick(2)">现场设备定位</li>
                        </ul>
                        <ul>
                            <li @click="liClick(3)">主控无规程操作</li>
                            <li @click="liClick(4)">现场应急操作</li>
                        </ul>
                    </div>
                    <div class="step2" v-if="step == 2">
                        <ul>
                            <li @click="chuti('简单')">
                                <!--                                      简单-->
                                <div>
                                    <el-icon><Star /></el-icon>简单
                                </div>
                            </li>
                            <li @click="chuti('正常')">
                                <!--                                    正常-->
                                <div>
                                    <el-icon><Star /></el-icon>
                                    <el-icon><Star /></el-icon> 正常
                                </div>
                            </li>
                            <li @click="chuti('困难')">
                                <!--                                    困难-->
                                <div>
                                    <el-icon><Star /></el-icon>
                                    <el-icon><Star /></el-icon>
                                    <el-icon><Star /></el-icon>
                                    困难
                                </div>
                            </li>
                        </ul>
                        <div class="back" @click=" step-- ">
                            <span>返回</span>
                        </div>
                    </div>
                </div>
                <div class="bumen">
                    -高级值长工作室 <br>
                    <span style="margin-top: 10px;">
                            -运行二处三值制作
                        </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {ElMessage} from "element-plus"
    import fs from "fs"
    import path from "path"
    import moment from "moment"
    let xlsx = require('node-xlsx')
    export default {
        name: "Index",
        data(){
            return {
                step: 1,
                value1: 3

            }
        },
        mounted() {
            if(!fs.existsSync( path.join(process.cwd(), `设备清单`) )){
                fs.mkdirSync( path.join(process.cwd(), `设备清单`) )
            }
        },
        methods: {
            liClick(num) {
                if(num === 1){
                    this.step++
                }else{
                    ElMessage({type: 'warning', message: '该功能未上线'})
                }
            },
            chuti(title) {
                let filePath = path.join(process.cwd(), `设备清单`, '设备清单.xlsx')
                if (!fs.existsSync(filePath)) {
                    ElMessage({type: 'error', message: '设备清单/设备清单.xlsx 不存在'})
                } else {
                    let big_arr = xlsx.parse(filePath)
                    console.log("big_arr", big_arr)
                    let famen = big_arr[0].data.slice(1).filter(item => item.length)
                    let AA = big_arr[1].data.slice(1).filter(item => item.length)
                    let LA = big_arr[2].data.slice(1).filter(item => item.length)
                    let ID = big_arr[3].data.slice(1).filter(item => item.length)
                    let EN = big_arr[4].data.slice(1).filter(item => item.length)
                    console.log(famen)
                    let allData
                    if (title == '简单') {
                        let a = this.getTenNum(30, famen)
                        let b = this.getTenNum(4, AA)
                        let c = this.getTenNum(16, LA.concat(ID).concat(EN))
                        allData = a.concat(b).concat(c)
                    } else if (title == '正常') {
                        let a = this.getTenNum(20, famen)
                        let b = this.getTenNum(6, AA)
                        let c = this.getTenNum(24, LA.concat(ID).concat(EN))
                        allData = a.concat(b).concat(c)
                    } else {
                        let all = famen.concat(AA).concat(LA).concat(ID).concat(EN)
                        let KSC702PP = []
                        let KSC708PP = []
                        let KSC703PP = []
                        let KSC704PP = []
                        let KSC705PP = []
                        let KSC706PP = []
                        let KSC707PP = []
                        for(let value of all){
                            if(value[2].toUpperCase().includes('KSC702PP')){
                                KSC702PP.push(value)
                            }

                            if(value[2].toUpperCase().includes('KSC708PP')){
                                KSC708PP.push(value)
                            }

                            if(value[2].toUpperCase().includes('KSC703PP') ){
                                KSC703PP.push(value)
                            }
                            if(value[2].toUpperCase().includes('KSC704PP') ){
                                KSC704PP.push(value)
                            }
                            if(value[2].toUpperCase().includes('KSC705PP') ){
                                KSC705PP.push(value)
                            }
                            if(value[2].toUpperCase().includes('KSC706PP') ){
                                KSC706PP.push(value)
                            }
                            if(value[2].toUpperCase().includes('KSC707PP') ){
                                KSC707PP.push(value)
                            }


                        }
                        let a = this.getTenNum(8, KSC702PP)
                        let b = this.getTenNum(8, KSC708PP)
                        let c1 = this.getTenNum(7, KSC703PP)
                        let c2 = this.getTenNum(7, KSC704PP)
                        let c3 = this.getTenNum(7, KSC705PP)
                        let c4 = this.getTenNum(7, KSC706PP)
                        let c5 = this.getTenNum(7, KSC707PP)

                        allData = a.concat(b).concat(c1).concat(c2).concat(c3).concat(c4).concat(c5)
                    }
                    this.setData(title,allData.sort(function() {
                        return .5 - Math.random();
                    }))
                    // this.tableData = big_arr[0].data.filter(item=> item.length)
                    // console.log(this.tableData)

                }
            },
            setData(title,allData){
                let year = moment().format('YYYY')
                let mounth = moment().format('MM')
                let day = moment().format('DD')
                let HH = moment().format('HH')
                let mm = moment().format('mm')
                let ss =moment().format('ss')
                let obj = {
                    type: title,
                    year ,
                    mounth,
                    day,
                    HH,
                    mm,
                    ss
                }
                for(let index in allData){
                    console.log(allData)
                    console.log(index)
                    let value = allData[index]
                    console.log(value)
                    if(index <= 25){
                        obj["a"+(+index+1)] = value[0]
                    }else{
                        obj["a"+(+index+1)] = value[1]
                    }
                    obj["b"+index] = value[2]
                }

                // 引入相关的库
                var PizZip = require('pizzip');
                var Docxtemplater = require('docxtemplater');
                var fs = require('fs');
                var path = require('path');
                // 读取文件,以二进制文件形式保存
                var content = fs.readFileSync( path.join(process.cwd(), `设备清单`, 'demo.docx'), 'binary');
                console.log(content)
                // // 压缩数据
                var zip = new PizZip(content);
                // 生成模板文档
                var doc =new Docxtemplater(zip);
                console.log(doc)
                // 设置填充数据
                doc.setData(obj);
                // //渲染数据生成文档
                doc.render()
                // 将文档转换文nodejs能使用的buf
                var buf = doc.getZip().generate({ type: 'nodebuffer' });
                // 输出文件

                const os = require('os');
                const homedir = os.homedir();

                const huanjing_lujing =  homedir + `\\Desktop`
                console.log(huanjing_lujing)
                // fs.writeFileSync(   path.join(process.cwd(), `设备清单`, year+':'+mounth+':'+day+' '+HH+':'+mm+':'+ss+'_'+title+`导出题目.docx`), buf);
                fs.writeFileSync(   path.join( huanjing_lujing, year+mounth+day+'_'+HH+mm+ss+'_'+title+`导出题目.docx`), buf);
                ElMessage({type: 'success', message: title + '试卷导出成功',offset: document.getElementsByTagName('body')[0].offsetHeight / 2})
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
            }
        }
    }
</script>
<style scoped lang="scss">
    .box{
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        text-align: center;
        padding-top: 12%;
        box-sizing: border-box;
        .title1{
            color: #fff;
            font-size: 35px;
            text-shadow: 10px 10px 20px black;
        }
        .title2{
            color: #fff;
            font-size: 50px;
            font-weight: bold;
            text-shadow: 10px 10px 20px black;
            span{
                font-size: 30px;
            }
        }

        .content{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 30px;
            .innerConnet{
                width: 600px;
                background: rgba(255,255,255,0.2);
                border: 2px solid #fff;
                border-radius: 10px;
                height: 250px;
                padding: 10px;
                .innerConnetBox{
                    width: 100%;
                    height: 100%;
                    background: #fff;
                    border-radius: 10px;
                    .title{
                        background: #005EBE;
                        width: 240px;
                        height: 60px;
                        line-height: 60px;
                        color: #fff;
                        font-size: 30px;
                        border-radius: 0 0 10px 10px;
                        margin: 0 auto;
                        text-shadow: 10px 10px 10px #333;
                    }
                    .step1{
                        ul{
                            padding: 0 15px;
                            display: flex;
                            list-style: none;
                            justify-content: space-between;
                            li{
                                background: #f2f2f2;
                                height: 60px;
                                width: 45%;
                                cursor: pointer;
                                flex-wrap: wrap;
                                line-height: 60px;
                                color: #005EBE;
                                font-size: 26px;
                                border-radius: 30px;
                                box-shadow: 10px 10px 5px 5px rgba(0,0,0,0.5);
                            }
                        }
                    }
                    .step2{
                        .back{
                            color: #808080;
                            font-size: 26px;
                            text-align: right;
                            padding-right: 20px;
                            cursor: pointer;
                        }
                        ul{
                            padding: 0 15px;
                            display: flex;
                            list-style: none;
                            justify-content: space-between;
                            margin-top: 50px;
                            li{
                                background: #f2f2f2;
                                height: 80px;
                                width: 32%;
                                cursor: pointer;
                                flex-wrap: wrap;
                                line-height: 80px;
                                color: #005EBE;
                                font-size: 30px;
                                border-radius: 30px;
                                div{
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                }
                            }
                        }
                    }
                }
                .bumen{
                    color: #FFF2C7;
                    text-align: center;
                    font-size: 26px;
                    margin-top: 85px;
                }
            }
        }
    }
</style>

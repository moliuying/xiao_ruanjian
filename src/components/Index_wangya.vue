<template>
    <div class="three">
        <div style=" height: 50px; background:#333333; padding: 5px 20px; width: 100%; position: fixed; top: 0; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between;box-sizing: border-box;">
            <div style="color: #fff; font-size: 18px; line-height: 40px;">
                {{name}}
            </div>
            <div>
                <el-button type="success" plain @click="luru" >录入</el-button>
                <el-button type="primary" plain @click="scrapy" >采集</el-button>
                <el-button type="primary" plain @click="look" >查询</el-button>
            </div>
        </div>

        <div style="height: calc( 100% - 50px ); position: fixed; top: 50px; overflow-y: scroll; display: flex; width: 100%;">
            <webview ref="webview1" partition="web_partition" :src="url1" style=" width:100%; height:100%;"></webview>
            <el-menu
                    active-text-color="#ffd04b"
                    background-color="#545c64"
                    text-color="#fff"
                    :default-openeds="[1]"
                    default-active="1-1"
                    class="el-menu-vertical-demo"
                    :collapse="false"
            >
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>管理类</span>
                    </template>
                    <el-menu-item index="1-1">客户管理</el-menu-item>
                    <el-menu-item index="1-2">客服管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>表格类</span>
                    </template>
                    <el-menu-item index="2-1">业务登记</el-menu-item>
                    <el-menu-item index="2-2">印刷生产通知单</el-menu-item>
                </el-sub-menu>
            </el-menu>
            <div style="width: calc( 100% - 200px ); background: #f5f5f5; padding: 15px;">
                <el-table :data="
  [{
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]" style="width: 100%" class="secondTable">
                    <el-table-column prop="name" label="评分细则" header-align="center" align="center"  />
                    <el-table-column prop="name" label="说明"  header-align="center" align="center"/>
                    <el-table-column prop="name" label="分数" header-align="center" align="center" />
<!--                    <el-table-column label="文件数" width="80" header-align="center" align="left">-->
<!--                        <template #default="scope">-->
<!--                            <el-button link type="primary" size="small" @click="open(scope.row)">-->
<!--                                {{ scope.row.files.length }}-->
<!--                            </el-button>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                    <el-table-column fixed="right" label="操作" width="200" align="center">
                        <template #default="scope">
                            <el-upload ref="upload" action="" :before-upload="(file)=>{ export_file_in(file,scope.$index) } " :show-file-list="false" style="vertical-align: middle;display: inline-block;
    margin-right: 15px;">
                                <el-button link  type="primary"  plain size="small">导入文件</el-button>
                            </el-upload>
                            <!--                        <el-button link  type="primary"  plain size="small" @click="expotFile">导入文件</el-button>-->
                            <el-button link type="primary" size="small" @click="edit(scope.row,scope.$index)">打分</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import {ElMessage} from "element-plus";
    let fs = require('fs')
    let path = require('path')
    let moment = require('moment')
    const axios = require('axios')
    // import menus  from './menus'
    let xlsx = require('node-xlsx')
    import user from '../models/user'
    import detail from "../models/detail";
    import list from "../models/list";
    export default {
        name: "Index",
        data(){
            return {
                name:'测试测试',
                menuIndex: null,
                menuItemIndex: 0,
                url1: 'http://www.ip33.com/shenfenzheng.html'
            }
        },
        computed: {
            // allScore(){
            //
            // }
        },
        async mounted() {

        },
        methods: {
            async look(){
                var allData = await user.findAll({
                    raw: true,
                    where:{
                        sex: '女',
                        result:'正确'
                    }
                });
                console.log(allData)
            },
            async luru() {
                let num = -1
                let arr = []
                for(let i=0; i<9999; i++){
                    num++
                    let nowNum = num
                    if(num<10){
                        num = '000'+nowNum
                    }else if(num<100){
                        num = '00'+nowNum
                    }else if(num<1000){
                        num = '0'+nowNum
                    }
                    arr.push({
                        idnum: '41302619910624'+num,
                        sex: '',
                        result: ''
                    })
                }
                console.log(arr.length)
                await user.bulkCreate(arr);
            },
            async scrapy(){
                const list_one = await user.findOne({
                    where: {
                        result_num: 0
                    }
                })
                console.log(list_one.id)
                await this.$refs[`webview1`].executeJavaScript(`
                    document.querySelector("#id_no").value = '${list_one.idnum}'
                    document.querySelector("#id_no").setAttribute('value', '${list_one.idnum}')
                    document.querySelector("#id_search").click()
                `)
                setTimeout(async ()=>{
                    let result = await this.$refs[`webview1`].executeJavaScript(`
                        [
                            document.querySelector("body > div.wrap > table > tbody > tr:nth-child(1) > td").innerText,
                            document.querySelector("body > div.wrap > table > tbody > tr:nth-child(4) > td").innerText,
                            document.querySelector("body > div.wrap > table > tbody > tr:nth-child(5) > td").innerText
                        ]
                    `)
                    console.log(result)
                    if(result[0] === list_one.idnum){
                        console.log("采集成功，更新保存后 下一个")
                        await user.update(
                            {
                                result_num: 1,
                                sex: result[1],
                                result:  result[2]
                            },
                            { where: { id: list_one.id } }
                        )
                        this.scrapy()
                    }
                },1000)
            }
        }
    }
</script>

<style scoped>
    ::v-deep .second .cell{
        font-size: 24px !important;
    }
    ::v-deep .second .el-button{
        font-size: 24px !important;
    }
    ::v-deep .loginModal{
        background: transparent !important;
        box-shadow: none;
        width: 240px;

    }
    ::v-deep .loginModal .el-dialog__body{
        padding-bottom: 0 !important;
    }
    ::v-deep .el-dialog__wrapper {
        text-align: center;
        white-space: nowrap;
        overflow: auto;
    &:after {
         content: "";
         display: inline-block;
         vertical-align: middle;
         height: 100%;
     }
    .el-dialog {
        margin: 30px auto !important;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        white-space: normal;
    }
    }
    .el-menu-vertical-demo{
        height: 100%;
    }
    ::v-deep  .el-sub-menu{
        width: 200px;
    }
    ::v-deep  .el-table .warning-row {
        --el-table-tr-bg-color: var(--el-color-warning-light-9);
    }
    ::v-deep  .el-table .success-row {
        --el-table-tr-bg-color: var(--el-color-success-light-9);
    }
    ::v-deep .title .el-input__inner{
        text-align: center;
        background: rgb(51, 51, 51);
        border: none;
        outline: noe;
        outline: none;
        color: #fff;
        font-size: 30px;
    }
</style>

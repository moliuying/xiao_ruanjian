<template>
    <el-menu
            mode="horizontal"
            background-color="#333333"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="padding-top: 10px; position: fixed; top: 0; left: 0; width: 100%;"
    >
        <el-menu-item style="float: right;">
            <el-button type="primary" @click=" scrapy ">采集列表</el-button>
        </el-menu-item>
        <el-menu-item style="float: right;">
            <el-button type="primary" @click=" scrapy2 ">采集详情</el-button>
        </el-menu-item>
        <el-menu-item style="float: right;">
            <el-button type="primary" @click=" export_excel ">导出</el-button>
        </el-menu-item>
        <el-menu-item style="float: left;">
            <el-button type="primary" @click=" stop = true ">关闭</el-button>
        </el-menu-item>
    </el-menu>
    <div style="padding: 10px; height: 100%; padding: 10px; margin-top: 50px;">
        <webview ref="webview1" partition="web_partition" :src="url1" style=" width:100%; height:100%;"></webview>
    </div>
        <el-dialog v-model="dialogTableVisible" title="用户登录" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px" :inline="true" style="margin: 0;">
                <el-form-item label="手机号" prop="cellphone" style=" width: 100%">
                    <el-input v-model="form.cellphone" placeholder="请输入手机号" clearable />
                </el-form-item>
                <el-form-item label="密码" prop="password" style=" width: 100%">
                    <el-input v-model="form.password" type="password" placeholder="请输入密码" clearable />
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
    <!--            <el-button @click="state.dialogTableVisible = false">取消</el-button>-->
                <el-button type="primary" @click=" login ">登录</el-button>
              </span>
            </template>
        </el-dialog>
</template>

<script>
    import {ElMessage} from "element-plus";
    let fs = require('fs')
    let path = require('path')
    let moment = require('moment')
    const axios = require('axios');

    const xlsx = require('node-xlsx');
    import list from '../models/list'
    import detail from '../models/detail'
    const axiosFn = function (method,url, params) {
        console.log(method,url, params)
        return new Promise((resolve, reject) => {
            axios({
                url: url,
                method: method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: params,
                data: params,
                async: false,
                // responseType: url.toLowerCase().includes('excel') ? 'blob' : '',
            })
                .then(res => {
                    resolve(res)
                }).catch((err) => {
                reject(err)
            })
        }).catch((err) => {
            console.log('err---', err)
        })
    };
    export default {
        name: "Index",
        data(){
            return {
                num: 0,
                timer: null,
                // dialogTableVisible: true,
                dialogTableVisible: false,
                addressCode: '',
                email: '',
                addressObj: {
                    gbEDI2de: 'Edinburgh',
                    gbLON2de: 'London',
                    gbMNC2de: 'Manchester'
                },
                GroupID: '',
                nowTime: null,
                stop: true,
                dateArr:[],
                seconds: 1,
                groupNum: 2057153,
                form:{
                    cellphone: "17600261478",
                    password: "123456",
                },
                url1: `https://search.bilibili.com/video?vt=23678601&keyword=%E4%BF%9D%E9%99%A9&from_source=webtop_search`,
                listArr: [],
                detailArr: [],
                list_one: null,
                page: 0,
                next: 0,
            }
        },
        async mounted() {
            this.$refs['webview1'].addEventListener('console-message', async e => {
                if (e.message) {
                    console.log('webview: ' + e.message);
                    if(e.message.includes('___111111111')){
                        let res = JSON.parse(e.message.split('___')[0])
                        console.log("--------")
                        console.log(res)
                        console.log(res.data.result)
                        if(res.data.result && res.data.result.length){
                            let arr = res.data.result.map( (item)=>{ return { video_id: item.id, video_arcurl: item.arcurl } })
                            this.listArr = [...this.listArr, ...arr]
                            console.log("this.listArr.length",this.listArr.length)

                            // await list.bulkCreate(this.listArr);
                            console.log("this.listArr",this.listArr.length)
                            setTimeout(()=>{
                                this.scrapy()
                            },2000)
                        }else{
                            console.log("采集完毕")
                            console.log("this.listArr",this.listArr.length)
                            await list.bulkCreate(this.listArr);
                        }
                    }else if(e.message.includes('_____________________------______222222222222')){
                        console.log(e.message.split('_____________________------______')[0]+'')
                        console.log('_____________________')
                        console.log(e.message.split('___')[0]+'')
                        let res = JSON.parse(e.message.split('_____________________------______')[0])
                        console.log(res)
                        if(res.data.replies && res.data.replies.length){
                            let data = []
                            for(let value of res.data.replies){
                                data.push(value)
                                data = data.concat(value.replies)
                            }
                            data = data.filter(item=> item)
                            let arr = data.map( (item)=>{
                                if(item){
                                    return {
                                        video_id: this.list_one.video_id,
                                        video_arcurl: this.list_one.video_arcurl,
                                        comment_name: item.member.uname,
                                        comment_sex: item.member.sex,
                                        comment_lev: item.member.level_info.current_level,
                                        comment_text: item.content.message,
                                        comment_time: moment(item.ctime).format('YYYY-MM-DD HH:mm:ss')
                                    }
                                }
                            })
                            console.log(arr)
                            this.detailArr = [...this.detailArr, ...arr]
                            console.log("this.detailArr.length--------------------",this.list_one.id,this.next,this.detailArr.length)
                            // console.log("this.detailArr--------------------", this.detailArr)
                            // await detail.bulkCreate(this.detailArr);
                            // await list.update(
                            //     { if_scrapy_over: 1 },
                            //     { where: { id: this.list_one.id } }
                            // )
                            setTimeout(()=>{
                                this.scrapy2()
                            },2000)
                        }else{
                            console.log("详情采集完毕--------------------")
                            console.log("this.detailArr.length--------------------",this.detailArr.length)
                            await detail.bulkCreate(this.detailArr);
                            await list.update(
                                { if_scrapy_over: 1 },
                                { where: { id: this.list_one.id } }
                            )
                            this.next = 0
                            this.detailArr = []
                            this.scrapy2()
                        }
                    }
                }
            })

        },
        methods:{
            async login(){
                let res = await this.Ajax('login',  this.form)
                if(res){
                    ElMessage({type: 'success', message: '登录成功'})
                    this.dialogTableVisible = false
                }
            },
            async scrapy(){
                this.page++
                let page = this.page
                console.log(page)
                let exexStr = `
                        function  getdata (){
                            return  new Promise(async (resolve, reject)=>{
                                fetch("https://api.bilibili.com/x/web-interface/search/type?__refresh__=true&_extra=&context=&page=${page}&page_size=42&from_source=&from_spmid=333.337&platform=pc&highlight=1&single_column=0&keyword=%E4%BF%9D%E9%99%A9&qv_id=yiDtrKoNiA1rVBSO174vIGdj9Z4Z3twH&ad_resource=5654&source_tag=3&category_id=&search_type=video&dynamic_offset=${ (page-1) * 30}", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "sec-ch-ua": "\\"Google Chrome\\";v=\\"107\\", \\"Chromium\\";v=\\"107\\", \\"Not=A?Brand\\";v=\\"24\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"macOS\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://search.bilibili.com/video?vt=23678601&keyword=%E4%BF%9D%E9%99%A9&from_source=webtop_search",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then( async res=>{
                                        let data = await res.text()
                                        console.log(data+'___111111111')
                                        resolve(data)
                                    }).catch(err=>{
                                        console.log('err',err)
                                        reject(err)
                                    })
                            })
                        }
                        getdata()
                `
                await this.$refs['webview1'].executeJavaScript(exexStr)
            },
            async scrapy2(){
                const list_one = await list.findOne({
                    where: {
                        if_scrapy_over: 0
                    },
                    offset: 4
                })
                this.next++
                console.log(this.next)
                if(list_one){
                    this.list_one = list_one
                    console.log(this.list_one)
                    let id = list_one.video_id
                    console.log(id)
                    let exexStr = `
                        function  getdata (){
                            return  new Promise(async (resolve, reject)=>{
                                fetch("https://api.bilibili.com/x/v2/reply/main?csrf=86b81192e5e2e0e1865676db9c848b56&mode=3&next=${this.next}&oid=${id}&plat=1&type=1", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "sec-ch-ua": "\\"Google Chrome\\";v=\\"107\\", \\"Chromium\\";v=\\"107\\", \\"Not=A?Brand\\";v=\\"24\\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\"macOS\\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://www.bilibili.com/video/BV1dq4y1R7BM/?spm_id_from=333.337.search-card.all.click&vd_source=92b10cb38c5e27e2d86ba063f8234254",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then( async res=>{
                                        let data = await res.text()
                                        console.log(data+'_____________________------______222222222222')
                                    }).catch(err=>{
                                        console.log('err',err)
                                        reject(err)
                                    })
                            })
                        }
                        getdata()
                `
                    await this.$refs['webview1'].executeJavaScript(exexStr)
                }else{
                    console.log("找不到了")
                }

            },


            async export_excel(){
                var allData = await detail.findAll({
                    raw: true,
                    where:{}
                });
                console.log(allData)
                let data = [
                    [ '数据库id','视频ID','视频地址','姓名','性别','等级','评论内容' ]
                ]
                for(let value of allData){
                    data.push([
                        value.id,
                        value.video_id,
                        value.video_arcurl,
                        value.comment_name,
                        value.comment_sex,
                        value.comment_lev,
                        value.comment_text
                    ])
                }
                console.log(  data  )
                if(!fs.existsSync( path.join(process.cwd(), `resources`) )){
                    fs.mkdirSync( path.join(process.cwd(), `resources`) )
                }
                if(!fs.existsSync( path.join(process.cwd(), `resources/app`) )){
                    fs.mkdirSync( path.join(process.cwd(), `resources/app`) )
                }
                let now_path = path.join(process.cwd(), `resources/app`,  `data.xlsx`);
                let buffer = xlsx.build([ { name: "sheet", data }]);
                fs.writeFileSync(now_path, buffer, {'flag': 'w'});
                ElMessage({ type: 'success', message: '导出成功' })
            },

        }
    }
</script>

<style scoped>
    :deep(.el-tabs__content){
        height: 100% !important;
    }
    :deep(.el-menu-item){
        padding: 0 5px !important;
    }
    :deep(.el-tabs__item){
        display: none;
    }
    .el-message{
        top: 220px !important;
    }
    ::v-deep .el-message{
        top: 220px !important;
    }
    ::v-deep .el-form-item__label{
        color: #fff !important;
    }
</style>

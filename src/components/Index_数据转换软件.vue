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
            数据转换软件
        </div>
        <div>
            <el-menu-item index="start" style="float: right;">
                <el-button type="primary" @click="trans">转化</el-button>
            </el-menu-item>

            <el-menu-item index="start" style="float: right;">
                <el-button type="warning" @click=" prevTextarea = ''; nowTextarea = ''">清空</el-button>
            </el-menu-item>
        </div>

    </el-menu>
    <div style="padding: 10px; height: 100%; padding: 10px; margin-top: 60px;">
        <el-row>
            <el-col :span="11">
                <el-input
                        :rows="20"
                        clearable
                        v-model="prevTextarea"
                        type="textarea"
                        placeholder="请粘贴你的匹配内容"
                />
            </el-col>
            <el-col :span="2">

            </el-col>
            <el-col :span="11">
                <el-input
                        :rows="20"
                        clearable
                        type="textarea"
                        v-model="nowTextarea"
                        placeholder="转化后的结果"
                />
            </el-col>
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
    export default {
        name: "Index",
        data(){
            return {
                // prevTextarea: '01=111 02=12 03=13 04=14 05=15',
                prevTextarea: '',
                nowTextarea: '',
                // textarea: '',
                dialogTableVisible: true,
                form:{
                    cellphone: "17600261478",
                    password: "123456",
                },
                taobao_url: 'https://login.taobao.com/member/login.jhtml'
                //https://shopsearch.taobao.com/search?q=宝宝吗
            }
        },
        methods:{
            // change(val){
            //     console.log(val)
            //     if(val){
            //         this.scrapy(val)
            //     }
            // },
            async login(){
                let res = await this.Ajax('login',  this.form)
                if(res){
                    ElMessage({type: 'success', message: '登录成功'})
                    this.dialogTableVisible = false
                }
            },
            async trans(){
                if(!this.prevTextarea){
                    ElMessage({type: 'error', message: '请输入匹配内容'})
                    return
                }

                this.prevTextarea = this.prevTextarea.replace(/\r\n/g,'').replace(/\n/g,'')

                let keyArr = []
                for(let i=1; i<=49; i++){
                    keyArr.push(i<10?'0'+i:i.toString())
                }
                console.log(keyArr)

                let originArr = this.prevTextarea.split(' ')
                console.log(originArr)
                let aArr = []
                for(let value of originArr){
                    let a = value.split('=')[0]
                    aArr.push(a)
                }
                for(let value of keyArr){
                    if(!aArr.includes(value)){
                        originArr.push(`${value}=0`)
                    }
                }
                let obj = {}
                for(let value of originArr){
                    if(value){
                        let a = value.split('=')[0]
                        let b = value.split('=')[1]
                        if(!obj[b]){
                            obj[b] = []
                        }
                        obj[b].push({
                            trueKey: a,
                            trueValue: b,
                            countKey: +a+(+b)
                        })
                    }
                }
                console.log(obj)
                console.log("Object.keys(obj)",Object.keys(obj))
                let keys = Object.keys(obj).sort()
                let newObj = {}
                for(let value of keys){
                    newObj[value] = obj[value]
                }
                console.log(newObj)
                let resultArr = []
                for(let key in newObj){
                    if(newObj[key].length > 1){
                        newObj[key].sort((a,b)=>{ return b.countKey - a.countKey })
                        for(let value of newObj[key]){
                            let ojj = {}
                            ojj[ value['trueKey'] ] = value['trueValue']
                            resultArr.push(ojj)
                        }
                    }else{
                        let ojj = {}
                        ojj[newObj[key][0]['trueKey']] = key
                        console.log(key,ojj)
                        resultArr.push(ojj)
                    }
                }
                //

                resultArr = resultArr.filter((item)=>{ return  Object.keys(item)[0] && Object.values(item)[0] })
                console.log(resultArr)
                console.log(JSON.stringify(resultArr))

                let lastArr = []
                for(let index in resultArr){
                    let value = resultArr[index]
                    lastArr.push([Object.keys(value)[0],Object.values(resultArr[resultArr.length-1-index])[0]])
                }
                // console.log( JSON.stringify(lastArr) )
                lastArr = lastArr.sort((a,b)=>{ return +a[0] - (+b[0]) })
                // // // //
                console.log(lastArr)
                let arr_final = []
                for(let value of lastArr){
                    arr_final.push(`${value[0]}=${value[1]}`)
                }
                this.nowTextarea = arr_final.join(' ')
                console.log( this.nowTextarea )
                ElMessage({type: 'success', message: '转化成功'})
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
    ::v-deep .el-form-item__label {
        color: #fff !important;
    }
    .el-message{
        top: 220px !important;
    }
    ::v-deep .el-message{
        top: 220px !important;
    }
</style>

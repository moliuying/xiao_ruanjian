<template>
    <div class="three">
        <div
                style=" background:#333333; padding: 5px 20px; width: 100%; position: fixed; top: 0; left: 0; width: 100%; display: flex; justify-content: space-between;box-sizing: border-box;">
            <el-button type="success" plain style="opacity: 0;">总分</el-button>
            <div style="color: #fff; font-size: 24px;">
                {{'happy city'.toUpperCase()}}
            </div>
            <div style="align-items: flex-end;">
                <el-button type="success"   @click="luruModal = true">{{ 'ingresar'.toUpperCase()}}</el-button>
            </div>
        </div>

        <div style="height: calc( 100% - 44px ); position: fixed; top: 42px; overflow-y: scroll; display: flex; width: 100%;">
<!--            <el-menu-->

<!--                    style="width: 200px;"-->
<!--                    active-text-color="#ffd04b"-->
<!--                    background-color="#545c64"-->
<!--                    class="el-menu-vertical-demo"-->
<!--                    default-active="0_0"-->
<!--                    :default-openeds="[0]"-->
<!--                    text-color="#fff"-->
<!--            >-->
<!--                <el-sub-menu v-for="(first,first_index) in [trueMenus[menuIndex]]"  :index="first_index" :key="first">-->
<!--                    <template #title>{{first.name}}</template>-->
<!--                    <el-menu-item v-for="(second,second_index) in first.data" @click="menuItemIndex = second_ibg.jpegndex"  :key="second_index" :index="first_index+'_'+second_index">-->
<!--                        {{second.title}}-->
<!--                    </el-menu-item>-->
<!--                </el-sub-menu>-->
<!--            </el-menu>-->
            <div style="width: calc( 100% ); background: #f5f5f5; padding: 15px;">
                <div style="margin-bottom: 20px; display: flex; justify-content: space-between;">
                    <el-date-picker
                            style="width:260px;    flex-grow: inherit;"
                            v-model="chooseTime"
                            type="daterange"
                            width="200"
                            :range-separator=" 'a'.toUpperCase() "
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="请选择查询日期"
                    />
                    <div>
                        <el-button plain type="primary">{{ 'total'.toUpperCase() }}: {{ tableData.length}}</el-button>
                        <el-button plain type="danger">{{ 'vip'.toUpperCase() }}: {{tableData.filter(item=> item.huiyuan).length}}</el-button>
                        <el-button plain type="warning">{{ 'compleaño'.toUpperCase()}}: {{tableData.filter(item=> item.shengri).length}}</el-button>
                        <el-button type="primary"  @click="dialogTableVisible = true">{{ 'buscar'.toUpperCase()}}</el-button>
                    </div>
                </div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="id" :label=" 'Nº'.toUpperCase() " align="center"  width="70" />
                    <el-table-column prop="name" :label=" 'nombre'.toUpperCase() " align="center"  />
                    <el-table-column :label=" 'vip'.toUpperCase() "  align="center" width="80">
                        <template #default="scope">
                            <el-switch v-model="scope.row.huiyuan" disabled :active-value="1" :inactive-value="0" />
                        </template>
                    </el-table-column>
                    <el-table-column :label=" 'compleaño'.toUpperCase() "   align="center" width="120">
                        <template #default="scope">
                            <el-switch v-model="scope.row.shengri" disabled :active-value="1" :inactive-value="0" />
                        </template>
                    </el-table-column>
                    <el-table-column :label=" 'tiempos ingresos'.toUpperCase() "   align="center" width="180">
                        <template #default="scope">
                            {{ moment(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                        </template>
                    </el-table-column>
                    <el-table-column  :label="'Duración del juego'.toUpperCase() "   align="center"  width="190">
                        <template #default="scope">
                            {{scope.row.time}} {{'min'.toUpperCase()}}
                        </template>
                    </el-table-column>
                    <el-table-column  :label="'Cuenta atrás'.toUpperCase() " align="center">
                        <template #default="scope">
                            <span :style="{color: scope.row.lastSecond ? 'red' : ''}">
                                <template v-if="scope.row.lastSecond">
                                    <template v-if="parseInt(scope.row.lastSecond / 60)">
                                        {{ parseInt(scope.row.lastSecond / 60) }}{{'min'.toUpperCase()}}
                                    </template>
                                    {{ scope.row.lastSecond % 60 }}{{'seg'.toUpperCase()}}
                                </template>
                                <template v-else>
                                    0
                                </template>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="desc" :label="'nota'.toUpperCase() "  align="center" />
                    <!--                <el-table-column prop="name" label="预览文件"/>-->
<!--                    <el-table-column fixed="right" label="操作" width="200" align="center">-->
<!--                        <template #default="scope">-->
<!--&lt;!&ndash;                            <el-upload ref="upload" action="" :before-upload="(file)=>{ export_file_in(file,scope.$index) } " :show-file-list="false" style="vertical-align: middle;display: inline-block;&ndash;&gt;-->
<!--&lt;!&ndash;    margin-right: 15px;">&ndash;&gt;-->
<!--&lt;!&ndash;                                <el-button link  type="primary"  plain size="small">导入文件</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                            </el-upload>&ndash;&gt;-->
<!--                            &lt;!&ndash;                        <el-button link  type="primary"  plain size="small" @click="expotFile">导入文件</el-button>&ndash;&gt;-->
<!--                            <el-button link type="primary" size="small" @click="del(scope.row,scope.$index)">删除</el-button>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                </el-table>
            </div>
        </div>
    </div>

    <el-dialog v-model="luruModal" :title=" 'ingresar información cliente'.toUpperCase() " :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form ref="form" :model="row" :rules="rules" label-width="180px" :inline="true" style="margin: 0;">
            <el-form-item  :label="'nombre'.toUpperCase() " prop="name" style=" width: 100%">
                <el-input v-model="row.name" placeholder="" clearable />
            </el-form-item>
            <el-form-item :label="'vip'.toUpperCase() " prop="huiyuan" style=" width: 100%">
                <el-switch v-model="row.huiyuan" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item :label="'compleaño'.toUpperCase() " prop="shengri" style=" width: 100%">
                <el-switch v-model="row.shengri" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item :label="'Duración del juego'.toUpperCase() " prop="time" style=" width: 100%">
                <el-input-number v-model="row.time" placeholder="" :min="1" :max="10000"/>
            </el-form-item>

            <el-form-item :label="'nota'.toUpperCase() " prop="desc" style=" width: 100%">
                <el-input v-model="row.desc" placeholder=""
                          :autosize="{ minRows: 2, maxRows: 4 }"
                          type="textarea"
                          maxlength="100"
                          show-word-limit
                          clearable />
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="luruModal = false">{{ 'cancelar'.toUpperCase() }}</el-button>
            <el-button type="primary" @click=" sureCreate ">{{ 'ingresar'.toUpperCase() }}</el-button>
          </span>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogTableVisible"  align-center :title=" 'revisar clave'.toUpperCase() " top="35vh" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" :inline="true" style="margin: 0;">
<!--            <el-form-item label="用户名" prop="cellphone" style=" width: 100%">-->
<!--                <el-input v-model="form.cellphone" placeholder="请输入用户名" clearable />-->
<!--            </el-form-item>-->
            <el-form-item :label=" 'clave'.toUpperCase() " prop="password" style=" width: 100%">
                <el-input v-model="form.password" type="password" placeholder="" clearable />
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click=" dialogTableVisible = false">{{ 'cancelar'.toUpperCase() }}</el-button>
            <el-button type="primary" @click=" checkPwd ">{{ 'BUSCAR'.toUpperCase() }}</el-button>
          </span>
        </template>
    </el-dialog>
</template>

<script>
    import {ElMessage} from "element-plus";
    let fs = require('fs')
    let path = require('path')
    let moment = require('moment')
    const axios = require('axios')
    let xlsx = require('node-xlsx')
    import user from '../models/user'
    const audio = new Audio(require('../assets/test.mp3'))
    export default {
        name: "Index",
        data(){
            return {
                pwd:'1205',
                form:{
                    cellphone: "17600261478",
                    password: "",
                },
                dialogTableVisible: false,
                chooseTime: [ moment().format('YYYY-MM-DD') , moment().format('YYYY-MM-DD')],
                tableData:[],
                luruModal: false,
                timer: null,
                row:{
                    name: '',
                    huiyuan: 0,
                    shengri: 0,
                    time: 30,
                    desc: null
                }
            }
        },
        computed: {
            // allScore(){
            //
            // }
        },
        async mounted() {
            this.getData()

            // var music = new Audio();
            // music.src="../assets/test.mp3"
            // music.play();

        },
        methods: {
            checkPwd(){
                if(this.form.password != '1205'){
                    ElMessage({type: 'error', message: 'clave  error'})
                    return
                }
                this.form.password = null
                this.dialogTableVisible = false;
                this.getData()
            },
            async login(){
                let res = await this.Ajax('login',  this.form)
                console.log(res)
                if(res){
                    ElMessage({type: 'success', message: '登录成功'})
                    this.dialogTableVisible = false
                }
            },
            async getData(){
                let page = 1
                let where = {
                    create_time: {
                        $gt: moment(this.chooseTime[0]).format('YYYY-MM-DD HH:mm:ss'),
                        $lt: moment(this.chooseTime[1]).add('day','1').format('YYYY-MM-DD HH:mm:ss'),
                    }
                }
                console.log(where)
                var allData = await user.findAll({
                    raw: true,
                    order: [
                        ['create_time', 'DESC']
                    ],
                    where,
                    'limit': 10000000,                      // 每页多少条
                    'offset': 10000000 * (page - 1)  // 跳过多少条
                });

                for(let item of allData){
                    let lastSecond  = (item.time * 60 ) -   moment( new Date() ) .diff( moment( item.create_time ) ,"seconds")
                    if( lastSecond > 0 ){
                        item.lastSecond = lastSecond
                    }else{
                        item.lastSecond = 0
                    }

                }
                this.tableData = allData

                clearInterval(this.timer)
                this.timer = setInterval(()=>{
                    for(let item of this.tableData){
                        // if( moment(this.chooseTime[0]).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ){
                        if( moment( new Date() ).isBetween(  moment(this.chooseTime[0]) ,  moment(this.chooseTime[1]).add('day','1') ) ){
                            console.log('代表是当天的计时')
                            if(item.lastSecond > 0){
                                item.lastSecond --
                                if(item.lastSecond == 0){
                                    ElMessage({ type: 'error', message: `${item.name}用户已到时间`, duration: 0 })
                                    audio.play()
                                }
                            }
                        }
                    }
                }, 1000)


                console.log(allData)
            },
            async sureCreate(){
                if(!this.row.name){
                    ElMessage({ type: 'error', message: '请输入用户姓名' })
                    return
                }
                let data = {}
                data["name"] = this.row.name
                data["time"] = this.row.time
                data["huiyuan"] = this.row.huiyuan
                data["shengri"] = this.row.shengri
                data["desc"] = this.row.desc
                data["create_time"] = moment().format("YYYY-MM-DD HH:mm:ss");
                data["update_time"] = moment().format("YYYY-MM-DD HH:mm:ss");
                await user.create(data);
                this.getData()
                this.row = {
                    name: '',
                    huiyuan: 0,
                    shengri: 0,
                    time: 30,
                    desc: null
                }
                this.luruModal = false
            },
            tableRowClassName(row) {
                console.log(row)
                if (row.rowIndex%2 === 1) {
                    return 'warning-row'
                } else {
                    return 'success-row'
                }
            },
            open(row){
                this.fileModal = true
                this.row = row
            },
            menuItemClick(item){
                console.log(item)
                this.first = item.index.split('_')[0]
                this.second = item.index.split('_')[1]
                this.tableData = menus[this.first]['leibies'][this.second]['xizes']
            },
            edit(row,index){
                console.log(row,index)
                this.dafenModal = true;
                this.chooseIndex = index;
                this.row = row
            },
            sureDafen(){
                this.trueMenus[this.menuIndex].data[this.menuItemIndex]['xizes'][this.chooseIndex].fenshu = this.row.fenshu
                this.trueMenus[this.menuIndex].data[this.menuItemIndex]['xizes'][this.chooseIndex].desc = this.row.desc
                this.dafenModal = false
            },
            refuse(){
                for(let item1 of this.menus){
                    for(let item2 of item1.leibies){
                        for(let item3 of item2.xizes){
                            item3.fenshu = 0
                            item3.desc = ""
                            item3.files = []
                        }
                    }
                }
            },
            async export_excel_out(){
                console.log(this.trueMenus)
                let xlsxBuildArr = []
                for(let item1 of this.trueMenus){
                    let dataArr = []
                    for(let item2 of item1.data){
                        for(let item3 of item2.xizes){
                            dataArr.push([item2.title,item3.xizeName,item3.fenshu,item3.desc])
                        }
                    }
                    xlsxBuildArr.push({
                        name: item1.name,
                        data: dataArr
                    })
                }
                console.log(xlsxBuildArr)
                // console.log("data---",data)
                let file_names = `${moment().format('YYYY-MM-DD-HH-mm-ss')}.xlsx`;
                let file_path = path.join(path.resolve(''), '/分数导出汇总');
                var stat = fs.existsSync(file_path)
                if (!stat) {
                    fs.mkdirSync(file_path);
                }
                let now_path = path.join(file_path, file_names);
                let buffer = xlsx.build(xlsxBuildArr);
                fs.writeFileSync(now_path, buffer, {'flag': 'w'});
                ElMessage({ type: 'success', message: '导出成功' })
            },
            async export_excel_in(file){
                console.log(file)
                let fileType = file.name.substring(file.name.lastIndexOf(".") + 1).toUpperCase()
                if (fileType == "XLSX" || fileType == "XLS" || fileType == "CSV") {
                    this.trueMenus = []
                    console.log(file.path)
                    let big_arr = xlsx.parse(file.path);
                    console.log("big_arr", big_arr)
                    let resultArr = []
                    for(let item1 of big_arr){
                        let arr2 = []
                        let obj = {}
                        for(let item2 of item1.data){
                            if( !obj[item2[0]] ){
                                obj[item2[0]] = []
                            }
                            obj[item2[0]].push({
                                xizeName: item2[1],
                                fenshu: item2[2],
                                desc: item2[3],
                                files:[]
                            })
                        }
                        for(let key in obj){
                            arr2.push({
                                title: key,
                                xizes: obj[key]
                            })
                        }
                        resultArr.push({
                            name: item1.name,
                            data: arr2
                        })
                    }
                    console.log(resultArr,'resuletArr')
                    this.trueMenus = resultArr
                    this.menus = big_arr
                    // console.log("big_arr", typeof big_arr)
                    // let version = this.version
                    // for(let item of big_arr){
                    //     arr.push({
                    //         cellphone: item[2].toString().replace(new RegExp('\t'),'').replace(' ',''),
                    //         shenfenzheng: item[1].toString().replace(' ',''),
                    //         version
                    //     })
                    // }
                    // let res = await this.Ajax('exportInExcel', { arr, version  })
                    // if(res){
                    //     ElMessage({message: file.name + '导入,并上传云端成功', grouping: true, type: 'success'})
                    // }
                } else {
                    ElMessage({message: file.name + '文件格式错误，只允许上传XLSX,XLS,CSV文件', grouping: true, type: 'error' })
                }
            },
            async export_file_in(file, chooseIndex) {
                console.log(file)
                if(this.trueMenus[this.menuIndex].data[this.menuItemIndex]['xizes'][chooseIndex].files.includes(file.path)){
                    ElMessage({type: 'error', message: '该文件已存在'})
                    return
                }else{
                    var reader = new FileReader()
                    reader.onload =  (evt) =>{
                        this.trueMenus[this.menuIndex].data[this.menuItemIndex]['xizes'][chooseIndex].files.push(evt.target.result)
                        ElMessage({type: 'success', message: '导入成功'})
                    }
                    reader.onerror = function (evt) {
                        console.error('error', evt)
                    }
                    reader.readAsDataURL(file)
                }
                // let fileType = file.name.substring(file.name.lastIndexOf(".") + 1).toUpperCase()
                // if (fileType == "XLSX" || fileType == "XLS" || fileType == "CSV") {
                //     let big_arr = xlsx.parse(file.path)[0].data;
                //     let arr = []
                //     console.log("big_arr",big_arr)
                //     console.log("big_arr", typeof big_arr)
                //     let version = this.version
                //     for(let item of big_arr){
                //         arr.push({
                //             cellphone: item[2].toString().replace(new RegExp('\t'),'').replace(' ',''),
                //             shenfenzheng: item[1].toString().replace(' ',''),
                //             version
                //         })
                //     }
                //     let res = await this.Ajax('exportInExcel', { arr, version  })
                //     if(res){
                //         ElMessage({message: file.name + '导入,并上传云端成功', grouping: true, type: 'success'})
                //     }
                // } else {
                //     ElMessage({message: file.name + '文件格式错误，只允许上传XLSX,XLS,CSV文件', grouping: true, type: 'error' })
                // }
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <div class="three">
        <div
                style=" background:#333333; padding: 5px 20px; width: 100%; position: fixed; top: 0; left: 0; width: 100%; display: flex; justify-content: space-between;box-sizing: border-box;">

            <div style="align-items: flex-start;">
                <el-button type="success" plain style="">分润金额：{{allPrice1}}</el-button>
                <el-button type="warning" plain style="">充值额：{{allPrice2}}</el-button>
            </div>
            <div style="color: #fff; font-size: 24px;">
                分润管理软件
            </div>
            <div style="align-items: flex-end;">
                <el-button type="primary" @click="luruModal = true"  v-if="activeName == '1'">添加用户</el-button>
                <el-button type="success" @click="recoredModal = true" v-if="activeName == '2'">用户充值</el-button>
            </div>
        </div>

        <div style="height: calc( 100% - 44px ); position: fixed; top: 42px; overflow-y: scroll; display: flex; width: 100%;">
            <div style="width: calc( 100% ); background: #f5f5f5; padding: 15px;">
                <el-tabs v-model="activeName" @tab-click="tabClick">
                    <el-tab-pane label="用户管理" name="1">
                        <div style="background: #fff;">
                            <el-button type="primary" style="float: right; margin-bottom: 20px;" @click="getUserList">
                                查询用户
                            </el-button>
                        </div>
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="id" label="id" align="center" width="70"/>
                            <el-table-column prop="name" label="姓名" align="center" width="70"/>
                            <el-table-column prop="parentId" label="上级id" align="center" width="70"/>
                            <el-table-column prop="desc" label="用户描述" align="center"/>
                            <el-table-column label=" 记录时间 "   align="center">
                                <template #default="scope">
                                    {{ moment(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200">
                                <template v-slot="scope">
                                    <el-popconfirm :title="'是否确认删除'+scope.row.name+'?'" @confirm="delOneUser( scope.row )">
                                        <template #reference>
                                            <el-button type="danger" >删除</el-button>
                                        </template>
                                    </el-popconfirm>
<!--                                    <el-button @click="delUser(scope.row)" type="warning" size="small">-->
<!--                                        删除-->
<!--                                    </el-button>-->
                                    <!--                                    <el-button type="text" size="small">编辑</el-button>-->
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="分成管理" name="2">
                        <div style="background: #fff;">
                            <el-date-picker
                                    style="width:260px;    flex-grow: inherit;"
                                    v-model="chooseTime"
                                    type="daterange"
                                    width="200"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    placeholder="请选择查询日期"
                            />
                            <el-input-number placeholder="用户id" v-model="userId" clearable style="margin-left: 15px;" @change="handleChange" :min="1" :max="100000000000000" label=""/>
                            <el-select v-model="userType" placeholder="请选择" style="margin-left: 10px;">
                                <el-option label="全部" :value="-1"></el-option>
                                <el-option label="分润" :value="1"></el-option>
                                <el-option label="充值" :value="0"></el-option>
                            </el-select>
                            <el-button type="primary" style="float: right; margin-bottom: 20px;" @click="getList">
                                查询分成
                            </el-button>
                        </div>
                        <el-table :data="tableDataList" style="width: 100%">
                            <!--                            <el-table-column prop="id" label="id" align="center" width="70"/>-->
                            <el-table-column prop="name" label="姓名" align="center" width="70"/>
                            <el-table-column prop="parentId" label="上级id" align="center"/>
                            <el-table-column label="类型" align="center" >
                                <template #default="scope">
                                    <!--                                    {{scope.row.bili}}-->
                                    {{scope.row.bili  == 0 ? '充值' : '分润'}} :  {{ scope.row.bili ? scope.row.money * scope.row.bili/100 : scope.row.money }}
                                </template>
                            </el-table-column>
                            <el-table-column label=" 记录时间 "   align="center">
                                <template #default="scope">
                                    {{ moment(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200">
                                <template v-slot="scope">
                                    <el-popconfirm :title="'是否确认删除'+scope.row.name+'?'" @confirm="delOneList( scope.row )">
                                        <template #reference>
                                            <el-button type="danger" >删除</el-button>
                                        </template>
                                    </el-popconfirm>
                                    <!--                                    <el-button @click="delUser(scope.row)" type="warning" size="small">-->
                                    <!--                                        删除-->
                                    <!--                                    </el-button>-->
                                    <!--                                    <el-button type="text" size="small">编辑</el-button>-->
                                </template>
                            </el-table-column>
                        </el-table>

                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>

    <el-dialog v-model="luruModal" title="录入用户" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form ref="form" :model="row" :rules="rules" label-width="180px" :inline="true" style="margin: 0;">
            <el-form-item label=" 上级id " prop="name" style=" width: 100%">
                <el-input-number v-model="row.id" @change="handleChange" :min="1" :max="100000000000000" label=""/>
            </el-form-item>
            <el-form-item label=" 用户姓名 " prop="name" style=" width: 100%">
                <el-input v-model="row.name" placeholder="" clearable/>
            </el-form-item>
            <el-form-item label="用户描述" prop="desc" style=" width: 100%">
                <el-input v-model="row.desc" placeholder=""
                          :autosize="{ minRows: 2, maxRows: 4 }"
                          type="textarea"
                          maxlength="100"
                          show-word-limit
                          clearable/>
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="luruModal = false">取消</el-button>
            <el-button type="primary" @click=" sureCreate ">确定</el-button>
          </span>
        </template>
    </el-dialog>
    <el-dialog v-model="recoredModal" title="用户充值" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form ref="form" :model="recordRow" :rules="rules" label-width="180px" :inline="true" style="margin: 0;">
            <el-form-item label=" 用户id " prop="name" style=" width: 100%">
                <el-input-number v-model="recordRow.id" :min="1" :max="100000000000000" label=""/>
            </el-form-item>
            <el-form-item label=" 充值金额 " prop="money" style=" width: 100%">
                <el-input-number v-model="recordRow.money" :min="1" :max="100000000000000" label=""/>
            </el-form-item>
            <!--            <el-form-item  label=" 用户姓名 " prop="name" style=" width: 100%">-->
            <!--                <el-input v-model="row.name" placeholder="" clearable />-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="用户描述" prop="desc" style=" width: 100%">-->
            <!--                <el-input v-model="row.desc" placeholder=""-->
            <!--                          :autosize="{ minRows: 2, maxRows: 4 }"-->
            <!--                          type="textarea"-->
            <!--                          maxlength="100"-->
            <!--                          show-word-limit-->
            <!--                          clearable />-->
            <!--            </el-form-item>-->
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="recoredModal = false">取消</el-button>
            <el-button type="primary" @click=" sureRecord ">确定</el-button>
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
    // import detail from "../models/detail";
    import list from "../models/list";

    const audio = new Audio(require('../assets/test.mp3'))
    export default {
        name: "Index",
        data() {
            return {
                allPrice1: 0,
                allPrice2: 0,
                activeName: '1',
                pwd: '1205',
                form: {
                    cellphone: "17600261478",
                    password: "",
                },
                dialogTableVisible: false,
                chooseTime: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                userId: null,
                userType: null,
                tableData: [],
                luruModal: false,
                recoredModal: false,
                row: {
                    parentId: 0,
                    desc: null,
                    name: ''
                },
                recordRow: {
                    id: null,
                    money: 0
                },
                tableDataList: []
            }
        },
        computed: {
            // allScore(){
            //
            // }
        },
        async mounted() {
            this.getList()
            this.getUserList()
        },
        methods: {
            async delOneList(row){
                await list.destroy({
                    where: {
                        id: row.id
                    }
                })
                this.getList()
            },
            async delOneUser(row){
                await user.destroy({
                    where: {
                        id: row.id
                    }
                })
                this.getUserList()
            },
            tabClick(){
                this.getList()
                this.getUserList()
            },
            async login() {
                let res = await this.Ajax('login', this.form)
                console.log(res)
                if (res) {
                    ElMessage({type: 'success', message: '登录成功'})
                    this.dialogTableVisible = false
                }
            },
            async getList(){
                let page = 1
                let where = {
                    create_time: {
                        $gt: moment(this.chooseTime[0]).format('YYYY-MM-DD HH:mm:ss'),
                        $lt: moment(this.chooseTime[1]).add('day','1').format('YYYY-MM-DD HH:mm:ss'),
                    }
                }
                if(this.userId){
                    where["userId"] = this.userId
                }
                // if(this.userType == 0){
                //     where["bili"] = 0
                // }
                // if(this.userType == -1){
                //     where["bili"] = 0
                // }
                this.tableDataList = await list.findAll({
                    raw: true,
                    order: [
                        ['create_time', 'DESC']
                    ],
                    where,
                    'limit': 10000000,                      // 每页多少条
                    'offset': 10000000 * (page - 1)  // 跳过多少条
                })
                this.tableDataList = this.tableDataList.filter((item)=>{
                    if(this.userType == 0){
                        return item.bili == 0
                    }else if(this.userType == 1){
                        return item.bili !== 0
                    }
                    return  item
                })

                this.allPrice1 = this.tableDataList.reduce((prev,current)=>{
                    if(current.bili > 0){
                        return  prev + (current.bili*current.money)/100
                    }else{
                        return  prev
                    }
                },0)
                this.allPrice2 = this.tableDataList.reduce((prev,current)=>{
                    if(current.bili == 0){
                        return  prev + current.money
                    }else{
                        return  prev
                    }
                },0)

                console.log( this.tableDataList )
            },
            async getUserList() {
                let page = 1
                let where = {

                }
                var allData = await user.findAll({
                    raw: true,
                    order: [
                        ['create_time', 'DESC']
                    ],
                    where,
                    'limit': 10000000,                      // 每页多少条
                    'offset': 10000000 * (page - 1)  // 跳过多少条
                });
                // console.log(allData)
                this.tableData = allData
            },
            // 充值记录
            async sureRecord() {
                if (!this.recordRow.id) {
                    ElMessage({type: 'error', message: '请录入充值用户id'})
                    return
                }

                //row.id
                let ifHave = await user.count({ where:{id: this.recordRow.id} })
                if(!ifHave){
                    ElMessage({type: 'error', message: '充值ID不存在，请检查'})
                    return
                }

                // let data = {}
                this.findParent(
                    this.recordRow.id,
                    -5,
                    this.recordRow.money, [])


            },
            async findParent(id, bili, money, arr) {
                bili += 5
                //通过ID 查找上级ID
                let data = await user.findOne({
                    raw: true,
                    where: {
                        id: id
                    },
                    'limit': 1
                })

                let parentName = null
                if(data.parentId){
                    let da = await user.findOne({
                        raw: true,
                        where: {
                            id: data.parentId
                        },
                        'limit': 1
                    })
                    parentName = da.name
                }
                arr.push({
                    bili,
                    userId: id,
                    name: data.name,
                    parentName,
                    money,
                    parentId:data.parentId
                })
                if (data.parentId) {
                    console.log(data.parentId)
                    this.findParent(data.parentId,bili, money, arr )
                } else {
                    // 查到头了
                    console.log(arr)
                    this.insertAllData(arr)
                }
            },
            async insertAllData(arr){
                await list.bulkCreate(arr);
                this.recoredModal = false
                this.getList()
            },
            async sureCreate() {
                if (!this.row.name) {
                    ElMessage({type: 'error', message: '请检测录入信息不能为空'})
                    return
                }

                //row.id
                if(this.row.id){
                    let ifHave = await user.count({ where:{id: this.row.id} })
                    if(!ifHave){
                        ElMessage({type: 'error', message: '上级ID不存在，请检查'})
                        return
                    }
                }
                let data = {}
                data["name"] = this.row.name
                data["parentId"] = this.row.id
                data["desc"] = this.row.desc
                data["create_time"] = moment().format("YYYY-MM-DD HH:mm:ss");
                data["update_time"] = moment().format("YYYY-MM-DD HH:mm:ss");
                await user.create(data);
                this.getUserList()
                this.row = {parentId: 0, name: '', desc: ''}
                this.luruModal = false
            },
            // async delUser(row){
            //     await user.delOne({id: 1});
            //     this.getUserList()
            // },
            tableRowClassName(row) {
                console.log(row)
                if (row.rowIndex % 2 === 1) {
                    return 'warning-row'
                } else {
                    return 'success-row'
                }
            },
            open(row) {
                this.fileModal = true
                this.row = row
            },
            menuItemClick(item) {
                console.log(item)
                this.first = item.index.split('_')[0]
                this.second = item.index.split('_')[1]
                this.tableData = menus[this.first]['leibies'][this.second]['xizes']
            },
            edit(row, index) {
                console.log(row, index)
                this.dafenModal = true;
                this.chooseIndex = index;
                this.row = row
            },
            sureDafen() {
                this.trueMenus[this.menuIndex].data[this.menuItemIndex]['xizes'][this.chooseIndex].fenshu = this.row.fenshu
                this.trueMenus[this.menuIndex].data[this.menuItemIndex]['xizes'][this.chooseIndex].desc = this.row.desc
                this.dafenModal = false
            },
            refuse() {
                for (let item1 of this.menus) {
                    for (let item2 of item1.leibies) {
                        for (let item3 of item2.xizes) {
                            item3.fenshu = 0
                            item3.desc = ""
                            item3.files = []
                        }
                    }
                }
            },
            async export_excel_out() {
                console.log(this.trueMenus)
                let xlsxBuildArr = []
                for (let item1 of this.trueMenus) {
                    let dataArr = []
                    for (let item2 of item1.data) {
                        for (let item3 of item2.xizes) {
                            dataArr.push([item2.title, item3.xizeName, item3.fenshu, item3.desc])
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
                ElMessage({type: 'success', message: '导出成功'})
            },
            async export_excel_in(file) {
                console.log(file)
                let fileType = file.name.substring(file.name.lastIndexOf(".") + 1).toUpperCase()
                if (fileType == "XLSX" || fileType == "XLS" || fileType == "CSV") {
                    this.trueMenus = []
                    console.log(file.path)
                    let big_arr = xlsx.parse(file.path);
                    console.log("big_arr", big_arr)
                    let resultArr = []
                    for (let item1 of big_arr) {
                        let arr2 = []
                        let obj = {}
                        for (let item2 of item1.data) {
                            if (!obj[item2[0]]) {
                                obj[item2[0]] = []
                            }
                            obj[item2[0]].push({
                                xizeName: item2[1],
                                fenshu: item2[2],
                                desc: item2[3],
                                files: []
                            })
                        }
                        for (let key in obj) {
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
                    console.log(resultArr, 'resuletArr')
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
                    ElMessage({message: file.name + '文件格式错误，只允许上传XLSX,XLS,CSV文件', grouping: true, type: 'error'})
                }
            },
            async export_file_in(file, chooseIndex) {
                console.log(file)
                if (this.trueMenus[this.menuIndex].data[this.menuItemIndex]['xizes'][chooseIndex].files.includes(file.path)) {
                    ElMessage({type: 'error', message: '该文件已存在'})
                    return
                } else {
                    var reader = new FileReader()
                    reader.onload = (evt) => {
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

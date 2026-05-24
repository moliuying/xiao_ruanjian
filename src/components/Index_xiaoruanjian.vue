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
        <el-button type="warning" @click="trans" style="float: right; margin-top: 13px;">解析</el-button>
        <el-button type="success" @click="export_excel_out" style="float: right; margin-top: 13px;">导出</el-button>
        <el-upload style="float: right; margin-top: 13px; margin-right: 10px;" ref="upload" action="" :before-upload="export_excel_in" :show-file-list="false" >
            <el-button  type="primary" >导入</el-button>
        </el-upload>
<!--            <el-menu-item index="start" style="float: right;">-->
<!--                <el-button type="warning" @click=" prevTextarea = ''; nowTextarea = ''">清空</el-button>-->
<!--            </el-menu-item>-->

    </el-menu>
    <div style="padding: 10px; height: 100%; padding: 10px; margin-top: 60px;">
        <el-table
                border
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column label="一"  header-align="center" align="center">
                <template #default="scope"> <el-input v-model="scope.row[0]" /> </template>
            </el-table-column>
            <el-table-column label="二"  header-align="center" align="center">
                <template #default="scope"> <el-input v-model="scope.row[1]" /> </template>
            </el-table-column>
            <el-table-column label="三" header-align="center" align="center">
                <template #default="scope"> <el-input v-model="scope.row[2]" /> </template>
            </el-table-column>
            <el-table-column label="四"  header-align="center" align="center">
                <template #default="scope"> <el-input v-model="scope.row[3]" /> </template>
            </el-table-column>
<!--            <el-table-column label="操作" width="150">-->
<!--                <template v-slot="scope">-->
<!--                    <el-button-->
<!--                            size="mini"-->
<!--                            type="danger"-->
<!--                            @click=" tableData.splice(scope.$index,1) ">删除第{{scope.$index+1}}行</el-button>-->
<!--                </template>-->
<!--            </el-table-column>-->
        </el-table>
    </div>

        <el-dialog v-model="lookResultModal" title="解析结果" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-table
                    border
                    :data="resultData"
                    style="width: 100%">
                <el-table-column label="一" width="80" header-align="center" align="left">
                    <template #default="scope"> <el-input v-model="scope.row[0]" style="text-align: center;"  /> </template>
                </el-table-column>
                <el-table-column label="二" width="80" header-align="center" align="left">
                    <template #default="scope"> <el-input v-model="scope.row[1]" /> </template>
                </el-table-column>
                <el-table-column label="三" width="80" header-align="center" align="left">
                    <template #default="scope"> <el-input v-model="scope.row[2]" /> </template>
                </el-table-column>
                <el-table-column label="四" width="80" header-align="center" align="left">
                    <template #default="scope"> <el-input v-model="scope.row[3]" /> </template>
                </el-table-column>
            </el-table>
            <template #footer>
              <span class="dialog-footer">
    <!--            <el-button @click="state.dialogTableVisible = false">取消</el-button>-->
                <el-button type="primary" @click=" lookResultModal = false ">查看完毕</el-button>
              </span>
            </template>
        </el-dialog>


<!--        <el-dialog v-model="dialogTableVisible" title="用户登录" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">-->
<!--            <el-form ref="form" :model="form" :rules="rules" label-width="100px" :inline="true" style="margin: 0;">-->
<!--                <el-form-item label="手机号" prop="cellphone" style=" width: 100%">-->
<!--                    <el-input v-model="form.cellphone" placeholder="请输入手机号" clearable />-->
<!--                </el-form-item>-->
<!--                <el-form-item label="密码" prop="password" style=" width: 100%">-->
<!--                    <el-input v-model="form.password" type="password" placeholder="请输入密码" clearable />-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <template #footer>-->
<!--              <span class="dialog-footer">-->
<!--    &lt;!&ndash;            <el-button @click="state.dialogTableVisible = false">取消</el-button>&ndash;&gt;-->
<!--                <el-button type="primary" @click=" login ">登录</el-button>-->
<!--              </span>-->
<!--            </template>-->
<!--        </el-dialog>-->
</template>

<script>
    import {ElMessage} from "element-plus";
    let fs = require('fs')
    let path = require('path')
    let moment = require('moment')
    let xlsx = require('node-xlsx')
    export default {
        name: "Index",
        data(){
            return {
                lookResultModal: false,
                dialogTableVisible: true,
                form:{
                    cellphone: "17600261478",
                    password: "123456",
                },
                resultData:[

                ],
                tableData: [],
                aArr:[],
                bArr:[],
                cArr:[],
                dArr:[],
                arr1: [],
                arr2: [],
                arr3: [],
                arr4: [],
            }
        },
        mounted() {

        },
        methods:{
            trans(){
                //统计分析
                console.log(this.tableData)
                this.aArr = []
                this.bArr = []
                this.cArr = []
                this.dArr = []
                this.arr1 =  []
                this.arr2 =  []
                this.arr3 =  []
                this.arr4 =  []
                for(let value of this.tableData){
                    this.aArr.push(value[0])
                    this.bArr.push(value[1])
                    this.cArr.push(value[2])
                    this.dArr.push(value[3])
                }
                // let reverseData = this.tableData.reverse()
                this.countNumList(0)
            },
            fnWanghou(num,currentArr,colmun){
                let indexArr = []
                for(let index in this.aArr){
                    let value = this.aArr[index]
                    if(+value === +currentArr[colmun]){
                        if( this.aArr[(+index)+num] != null  &&  this.aArr[(+index)+num] != undefined){
                            indexArr.push( this.aArr[(+index)+num] )
                        }
                    }
                }
                return indexArr
            },
            countNumList(num){
                num++
                if(num < 10 ){
                    let currentArr =  this.tableData[this.tableData.length - num]
                    let indexArr0 = this.fnWanghou(num,currentArr,0)
                    let indexArr1 = this.fnWanghou(num,currentArr,1)
                    let indexArr2 = this.fnWanghou(num,currentArr,2)
                    let indexArr3 = this.fnWanghou(num,currentArr,3)
                    this.arr1.push( indexArr0 )
                    this.arr2.push( indexArr1 )
                    this.arr3.push( indexArr2 )
                    this.arr4.push( indexArr3 )
                    this.countNumList(num)
                }else{
                    console.log(this.arr1)
                    this.result = [
                        this.getLast( this.arr1 ),
                        this.getLast( this.arr2 ),
                        this.getLast( this.arr3 ),
                        this.getLast( this.arr4 ),
                    ]
                    console.log( JSON.stringify(this.result) )
                    let arr = this.result
                    let resultArr = []
                    for(let i=0; i<10; i++){
                        let subArr = []
                        for(let index in arr){
                            subArr.push(arr[index][i])
                        }
                        resultArr.push( subArr )
                    }
                    this.resultData = resultArr
                    this.lookResultModal = true
                    // this.export_excel_out(this.result)
                }
            },
            getLast(arr){
                let obj = {}
                for(let value of arr.flat()){
                    if(!obj[value]){
                        obj[value] = 1
                    }else{
                        obj[value] += 1
                    }
                }
                console.log(obj)
                let newArr = []
                for(let key in obj){
                    newArr.push({
                        key: +key,
                        value: obj[key]
                    })
                }
                newArr.sort((a,b)=>{
                    if(a.value > b.value){ return -1 }
                    if(a.value < b.value){ return 1 }
                    if(a.value = b.value){ return a.key > b.key ? 1 : -1 }
                })
                newArr = newArr.map(item=>item.key)
                return newArr
            },
            async login(){
                // let res = await this.Ajax('login',  this.form)
                // if(res){
                //     ElMessage({type: 'success', message: '登录成功', offset: 120})
                    // this.dialogTableVisible = false
                // }
            },
            export_excel_out(arr){
                let dataArr  = this.resultData
                let xlsxBuildArr = []
                xlsxBuildArr.push({
                    name: 'sheet1',
                    data: dataArr
                })
                console.log(xlsxBuildArr)
                // console.log("data---",data)
                let file_names = `解析结果导出${moment().format('YYYY-MM-DD-HH-mm-ss')}.xlsx`
                let file_path = path.join(path.resolve(''), '/汇总')
                var stat = fs.existsSync(file_path)
                if (!stat) {
                    fs.mkdirSync(file_path);
                }
                let now_path = path.join(file_path, file_names);
                let buffer = xlsx.build(xlsxBuildArr);
                fs.writeFileSync(now_path, buffer, {'flag': 'w'});
                ElMessage({ type: 'success', message: '导出成功', offset: 120 })
            },
            export_excel_in(file){
                let fileType = file.name.substring(file.name.lastIndexOf(".") + 1).toUpperCase()
                if (fileType == "XLSX" || fileType == "XLS" || fileType == "CSV") {
                    console.log(file.path)
                    let big_arr = xlsx.parse(file.path);
                    console.log("big_arr",big_arr)
                    this.tableData = big_arr[0].data.filter(item=> item.length)

                    console.log(this.tableData)
                } else {
                    ElMessage({message: file.name + '文件格式错误，只允许上传XLSX,XLS,CSV文件', grouping: true, type: 'error' })
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

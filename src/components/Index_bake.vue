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
            文本过滤
        </div>
        <div>
            <!--            {{text4}}-->
            <el-upload ref="upload" action="" :before-upload="test" :show-file-list="false" style="vertical-align: middle;display: inline-block; margin-left: 15px; margin-top: 10px;">
                <el-button  type="primary"   >测试</el-button>
            </el-upload>


            <el-upload ref="upload" action="" :before-upload="export_excel_in1" :show-file-list="false" style="vertical-align: middle;display: inline-block; margin-left: 15px; margin-top: 10px;">
                <el-button  type="primary"   >导入原始数据</el-button>
            </el-upload>
<!--            <el-upload ref="upload" action="" :before-upload="export_excel_in2" :show-file-list="false" style="vertical-align: middle;display: inline-block; margin-left: 15px;  margin-top: 10px;">-->
<!--                <el-button  type="primary"   >导入文本2</el-button>-->
<!--            </el-upload>-->
            <el-menu-item index="start" style="float: right;">
                <el-button type="primary" @click="trans">开始过滤</el-button>
            </el-menu-item>
            <el-menu-item index="start" style="float: right;">
                <el-button type="success" @click="copy">复制结果</el-button>
            </el-menu-item>
            <el-menu-item index="start" style="float: right;">
                <el-button type="warning" @click=" text1 = ''; text3 = ''">清空</el-button>
            </el-menu-item>
        </div>

    </el-menu>
    <div style="padding: 10px; height: 100%; padding: 10px; margin-top: 60px;">
        <!--        <div style="color: red; font-size: 20px;">-->
        <!--            <el-input clearable-->
        <!--                      v-model="link"-->
        <!--                      placeholder="请粘贴你的手机号"-->
        <!--            />-->
        <!--        </div>-->
        <!--        <div style="color: red; font-size: 20px;">-->
        <!--            {{a}}-->
        <!--            {{b}}-->
        <!--        </div>-->
        <el-row>
            <el-col :span="24">
                <el-input
                        :rows="3"
                        clearable
                        v-model="text1"
                        type="textarea"
                        placeholder="原始数据的路径"
                />
            </el-col>
<!--            <el-col :span="2">-->

<!--            </el-col>-->
<!--            <el-col :span="11">-->
<!--                <el-input-->
<!--                        :rows="3"-->
<!--                        clearable-->
<!--                        type="textarea"-->
<!--                        v-model="text2"-->
<!--                        placeholder="要过滤的文本2的路径"-->
<!--                />-->
<!--            </el-col>-->

        </el-row>
        <!--        <el-row style="margin-top: 20px;">-->
        <!--            <el-col :span="24">-->
        <!--                <el-input-->
        <!--                        :rows="3"-->
        <!--                        clearable-->
        <!--                        type="textarea"-->
        <!--                        v-model="text4"-->
        <!--                        placeholder="进度展示处"-->
        <!--                />-->
        <!--            </el-col>-->
        <!--        </el-row>-->
        <el-row style="margin-top: 20px;">
            <el-col :span="24">
                <el-input
                        :rows="8"
                        clearable
                        type="textarea"
                        v-model="text3"
                        placeholder="处理结果展示处"
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
    let request = require('request')
    let cheerio = require('cheerio')
    // import useClipboard from "vue-clipboard3";
    // import request from 'request'
    // import cheerio from 'cheerio'

    const { clipboard } = require('electron')



    export default {
        name: "Index",
        data(){
            return {
                // link: 'http://webapi.http.zhimacangku.com/getip?num=1&type=1&pro=&city=320300&yys=0&port=1&pack=304637&ts=0&ys=0&cs=0&lb=1&sb=0&pb=4&mr=2&regions=',
                // addressArr: [["北京市",110200],["河北省秦皇岛市",130300],["河北省衡水市",131100],["内蒙古兴安盟",152200],["辽宁省大连市",210200],["辽宁省大连市市辖区",210201],["辽宁省鞍山市",210300],["辽宁省抚顺市",210400],["辽宁省锦州市",210700],["辽宁省锦州市市辖区",210701],["辽宁省营口市",210800],["辽宁省辽阳市",211000],["辽宁省盘锦市",211100],["辽宁省铁岭市",211200],["吉林省吉林市",220200],["黑龙江省鹤岗市",230400],["江苏省南京市",320100],["江苏省徐州市",320300],["江苏省苏州市",320500],["江苏省南通市",320600],["江苏省连云港市",320700],["江苏省连云港市海州区",320706],["江苏省淮安市",320800],["江苏省盐城市",320900],["江苏省扬州市",321000],["江苏省泰州市",321200],["江苏省宿迁市",321300],["浙江省杭州市萧山区",330109],["浙江省宁波市",330200],["浙江省温州市",330300],["浙江省湖州市",330500],["浙江省金华市",330700],["浙江省衢州市",330800],["浙江省舟山市",330900],["浙江省丽水市",331100],["安徽省合肥市",340100],["安徽省芜湖市",340200],["安徽省淮北市",340600],["安徽省淮北市烈山区",340604],["安徽省铜陵市",340700],["安徽省黄山市",341000],["安徽省滁州市",341100],["安徽省池州市",341700],["安徽省池州市贵池区",341702],["福建省福州市",350100],["福建省莆田市",350300],["福建省三明市",350400],["福建省泉州市",350500],["福建省漳州市",350600],["福建省南平市",350700],["福建省宁德市",350900],["江西省景德镇市",360200],["江西省鹰潭市",360600],["江西省抚州市",361000],["山东省济南市",370100],["山东省淄博市",370300],["山东省烟台市",370600],["山东省日照市",371100],["河南省三门峡市",411200],["湖北省黄石市",420200],["湖北省襄樊市",420600],["湖北省荆门市",420800],["湖北省孝感市",420900],["湖南省长沙市",430100],["湖南省湘潭市",430300],["湖南省邵阳市",430500],["湖南省郴州市",431000],["湖南省怀化市",431200],["湖南省吉首市",433101],["广东省广州市",440100],["广东省汕头市",440500],["广东省佛山市",440600],["广东省东莞市",441900],["广西桂林市",450300],["重庆市渝北区",500112],["重庆市市",500300],["四川省成都市",510100],["四川省自贡市",510300],["四川省德阳市",510600],["四川省绵阳市",510700],["四川省广元市",510800],["四川省乐山市",511100],["四川省雅安市",511800],["四川省西昌市",513401],["贵州省六盘水市",520200],["贵州省遵义市",520300],["陕西省西安市",610100],["陕西省铜川市",610200],["陕西省咸阳市",610400],["陕西省渭南市",610500],["陕西省汉中市",610700],["陕西省榆林市",610800],["陕西省安康市",610900]],
                // prevTextarea: '01=111 02=12 03=13 04=14 05=15',
                text1:'',
                text2:'',
                text3:'',
                text4:'',
                a: '',
                b: '',
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
            test(file){
                console.log(file)
                console.log(file.file)
                console.log(file.name)
                // var formData= new FormData();
                // formData.append("farr",file.file);
                // formData.append("file",file);
                // console.log(123)


                let cookies = [{"path":"/","session":false,"domain":"facebook.com","hostOnly":false,"sameSite":"no_restriction","name":"c_user","httpOnly":false,"id":1,"secure":true,"storeId":"0","value":"100006172950981"},{"path":"/","session":false,"domain":"facebook.com","hostOnly":false,"sameSite":"no_restriction","name":"datr","httpOnly":false,"id":2,"secure":true,"storeId":"0","value":"aVNNZFZQPTCu4dxQhQFKN8PK"},{"path":"/","session":false,"domain":"facebook.com","hostOnly":false,"sameSite":"no_restriction","name":"dpr","httpOnly":false,"id":3,"secure":true,"storeId":"0","value":"2.25"},{"path":"/","session":false,"domain":"facebook.com","hostOnly":false,"sameSite":"no_restriction","name":"fr","httpOnly":false,"id":4,"secure":true,"storeId":"0","value":"0QjCpswS01SyneJIF.AWVpOxOO8h3gtjvxTbqzMxKgPQU.BkTVNp..AAA.0.0.BkTVNp.AWV4_uqaIzs"},{"path":"/","session":false,"domain":"facebook.com","hostOnly":false,"sameSite":"no_restriction","name":"sb","httpOnly":false,"id":5,"secure":true,"storeId":"0","value":""},{"path":"/","session":false,"domain":"facebook.com","hostOnly":false,"sameSite":"no_restriction","name":"xs","httpOnly":false,"id":6,"secure":true,"storeId":"0","value":"14:C0csLA7LNZapjQ:2:1682789225:-1:15818"}]
                let cookie = ( cookies.map( item=>{   if(['c_user','datr','fr','xs'].includes(item.name) ) { return  item.name+'='+item.value  }} ) ).join('; ')
                let formData = {
                    farr: file.file,
                    // fb_dtsg,
                    qn: "comet_marketplace_composer",
                    target_id: "1663689853903557",
                }
                // axios({
                //     url: `https://upload.facebook.com/ajax/react_composer/attachments/photo/upload?av=100006172950981&__user=100006172950981&__a=1&__req=1i&__hs=19521.HYP%3Acomet_pkg.2.1..2.1&dpr=1&__ccg=EXCELLENT&__rev=1007670151&__s=vm3frv%3An58sii%3Aisz66j&__hsi=7244129049269266086&__dyn=7AzHJ16UW5Eb8ng5K8G6EjBWobVo66u2i5U4e2CE4ibyQdwSAxacyUco5S3O2Saxa1NwJwpUe8hwaG0Z82_CxS320om78bbwto88422y11xmfz81s8hwGxu782lwv89kbxS2218wc61axe3e9x-3m1mzXw8W58jwGzE8FU5e7oqBwJK2W5olwUwOzEjUlDw-wUwxwjFovUy2a0SEuBwJCwLyESE2KwwwOg2cwMwBwiodUcojxK2B0oobo8oC1Hg6C&__csr=gP3_4NsBEykWq5j_bHRYHlqd48IAnd4iF_kOnkB9uWF5nEGTEQyKFVa8WqXvbdqjHiZdiOACFuiAFsB2kCSKzfOteqRl4BF4BQhqGiqnCCK-VaGmimchQ4qGKqGVEGiQijUqF3Qq8HzuZaGjKuijh99FoZ12dxamqiA8UGLy8C5EuyFAHZpoabBLCDoybxx2UWF8PDK2HGemewAU8UW8Cy8ymEvjxeUkUfFUmG7UrzoogG6E4a2i2W2ieAz8eUgz9EnBxG48bazV8422K363e4E88y7UnxyqdCwAxO2q3S2S7U-6E4S6Ulxa6odoaU025fw8-u00wZE0ec81g86K0g2062E-08bw9m0jy361ww1mO05cz05pQ03m-0JE1EQUkw19q08PoS2203IC581Q830w4exvJw6pDS0V80zHw9y2mUG0Vp64IM5p2o3jG0aXg1ko&__comet_req=15&fb_dtsg=NAcO7O8aMgJBC_uNlztHxrXQE2IsTZqctWgIfAuZNXCbKl058YkuVIQ%3A14%3A1682789225&jazoest=25523&lsd=ENliJSPHKvXVYy1PrSX-UC&__spin_r=1007670151&__spin_b=trunk&__spin_t=1686655229&qpl_active_flow_ids=138820675`,
                //     method: 'post',
                //     data: formData,
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //         'cookie': cookie,
                //         "x-asbd-id": "129477",
                //         "x-fb-friendly-name": "useCometMarketplaceListingCreateMutation",
                //         "x-fb-lsd": "UkqDZauUTI7ciDfyESqKsT",
                //         'authority': "www.facebook.com",
                //         'accept-language': "zh-CN,zh;q=0.9",
                //         'cache-control': "max-age=0",
                //         'dnt': "1",
                //         "sec-ch-prefers-color-scheme": "light",
                //         'sec-ch-ua' : '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                //         "sec-ch-ua-full-version-list" : '"Not.A/Brand";v="8.0.0.0", "Chromium";v="114.0.5735.106", "Google Chrome";v="114.0.5735.106"',
                //         'sec-ch-ua-mobile' : "?0",
                //         'sec-ch-ua-platform': "macOS",
                //         'sec-ch-ua-platform-version': "12.6.0",
                //         'sec-fetch-dest': "document",
                //         'sec-fetch-mode': "navigate",
                //         'sec-fetch-site': "none",
                //         'sec-fetch-user': "?1",
                //         'upgrade-insecure-requests': "1",
                //         'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
                //         'viewport-width': "603",
                //     }
                // }).then(res => {
                //     console.log('==>res', res.data)
                // }).catch(err => {
                //     console.log('err', err)
                // })
            },
            export_excel_in1(file){
                console.log(file.path)
                // let data = fs.readFileSync(file.path,'utf-8')
                this.text1 = file.path
                console.log(this.text1)
                // let big_arr = xlsx.parse(file.path)
            },
            export_excel_in2(file){
                console.log(file.path)
                // let data = fs.readFileSync(file.path,'utf-8')
                this.text2 = file.path
                console.log(this.text2)
                // let big_arr = xlsx.parse(file.path)
            },
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
            async copy(){
                clipboard.writeText(this.text3, 'selection')
                console.log(clipboard.readText('selection'))
                ElMessage({type: 'success', message: '复制成功'})
                console.log("Success");
            },
            async copy2(){
                clipboard.writeText(this.prevTextarea, 'selection')
                ElMessage({type: 'success', message: '复制成功'})
                console.log("Success");
            },
            async trans(){
                if(!this.text1){
                    ElMessage({type: 'error', message: '导入原始数据的内容不能为空'})
                    return
                }

                let data1 = fs.readFileSync(this.text1,'utf-8')
                // let data2 = fs.readFileSync(this.text2,'utf-8')

                let arr1 = data1.split('\r\n')
                // let arr1 = data1.split('\n')
                // let arr2 = data2.split('\r\n')


                // let arr1 = data1.split('\n')
                // let arr2 = data2.split('\n')
                console.log(arr1)
                // console.log(arr2)
                let len = arr1.length
                let arr = []
                for(let index in arr1){
                    let item = arr1[index]
                    console.log(item)
                    console.log(item.includes('关注'))
                    // console.log(arr1[+index])
                    // console.log(arr1[+index+1])
                    console.log(arr1[+index+2])
                    if(item.includes('关注') && arr1[+index+2]){
                        arr.push(arr1[+index+2])
                    }
                    this.text3 = arr.join('\n')
                    // if(!arr2.includes(item)){
                    //     arr.push(item)
                    // }
                    // // console.log( index)
                    // // console.log( index+'/'+ len)
                    // // this.text4 =  index+'/'+ len
                    console.log( parseFloat((+index+1)/(+len)).toFixed(2)*100 + '%' )
                }
                console.log(arr)
                // let result_path = path.join(process.cwd(),  `${moment().format('YYYY-MM-DD-HH-mm-ss')}.txt`)
                // this.text3 =  result_path
                // fs.writeFileSync( result_path , arr.join('\r\n') );
                // alert('解析成功')
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

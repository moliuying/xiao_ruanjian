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
            链接转换软件
        </div>
        <div>
            <el-menu-item index="start" style="float: right;">
                <el-button type="primary" @click="trans">转化</el-button>
            </el-menu-item>
            <el-menu-item index="start" style="float: right;">
                <el-button type="success" @click="copy2">复制手机号</el-button>
            </el-menu-item>
            <el-menu-item index="start" style="float: right;">
                <el-button type="success" @click="copy">复制</el-button>
            </el-menu-item>
            <el-menu-item index="start" style="float: right;">
                <el-button type="warning" @click=" prevTextarea = ''; nowTextarea = ''">清空</el-button>
            </el-menu-item>
        </div>

    </el-menu>
    <div style="padding: 10px; height: 100%; padding: 10px; margin-top: 60px;">
        <div style="color: red; font-size: 20px;">
            <el-input clearable
                    v-model="link"
                    placeholder="请粘贴你的手机号"
            />
        </div>
        <div style="color: red; font-size: 20px;">
            {{a}}
            {{b}}
        </div>
        <el-row>
            <el-col :span="11">
                <el-input
                        :rows="20"
                        clearable
                        v-model="prevTextarea"
                        type="textarea"
                        placeholder="请粘贴你的手机号"
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
                link: 'http://find.xiaoxiongcloud.com/find_http?key=475ccfd13f2407f3&count=1&type=text&only=1&province=1014&city=1085&textSep=1&pw=no',
                addressArr: [["北京市",215],["天津市",235],["石家庄市",255],["唐山市",279],["秦皇岛市",294],["邯郸市",302],["邢台市",322],["保定市",340],["张家口市",366],["承德市",382],["沧州市",394],["廊坊市",410],["衡水市",421],["太原市",434],["大同市",445],["阳泉市",457],["长治市",461],["晋城市",473],["朔州市",479],["晋中市",486],["运城市",498],["忻州市",512],["临汾市",527],["吕梁市",545],["呼和浩特市",560],["包头市",570],["乌海市",580],["赤峰市",584],["通辽市",597],["鄂尔多斯市",606],["呼伦贝尔市",615],["巴彦淖尔市",629],["乌兰察布市",637],["兴安盟",649],["锡林郭勒盟",656],["阿拉善盟",669],["沈阳市",674],["大连市",687],["鞍山市",698],["抚顺市",705],["本溪市",713],["丹东市",720],["锦州市",727],["营口市",735],["阜新市",742],["辽阳市",750],["盘锦市",758],["铁岭市",763],["朝阳市",771],["葫芦岛市",779],["长春市",787],["吉林市",797],["四平市",807],["辽源市",812],["通化市",817],["白山市",825],["松原市",832],["白城市",838],["延边朝鲜族自治州",844],["哈尔滨市",854],["齐齐哈尔市",874],["鸡西市",891],["鹤岗市",901],["双鸭山市",910],["大庆市",919],["伊春市",929],["佳木斯市",947],["七台河市",957],["牡丹江市",962],["黑河市",972],["绥化市",979],["大兴安岭地区",990],["上海市",995],["南京市",1015],["无锡市",1029],["徐州市",1038],["常州市",1049],["苏州市",1057],["南通市",1069],["连云港市",1078],["淮安市",1085],["盐城市",1093],["扬州市",1103],["镇江市",1111],["泰州市",1118],["宿迁市",1125],["杭州市",1132],["宁波市",1146],["温州市",1158],["嘉兴市",1170],["湖州市",1178],["绍兴市",1184],["金华市",1191],["衢州市",1201],["舟山市",1208],["台州市",1212],["丽水市",1222],["合肥市",1233],["芜湖市",1241],["蚌埠市",1249],["淮南市",1257],["马鞍山市",1264],["淮北市",1269],["铜陵市",1274],["安庆市",1278],["黄山市",1289],["滁州市",1297],["阜阳市",1306],["宿州市",1315],["巢湖市",1321],["六安市",1327],["亳州市",1335],["池州市",1340],["宣城市",1345],["福州市",1354],["厦门市",1367],["莆田市",1374],["三明市",1380],["泉州市",1393],["漳州市",1406],["南平市",1418],["龙岩市",1429],["宁德市",1437],["南昌市",1448],["景德镇市",1457],["萍乡市",1462],["九江市",1468],["新余市",1481],["鹰潭市",1484],["赣州市",1488],["吉安市",1507],["宜春市",1521],["抚州市",1532],["上饶市",1544],["济南市",1558],["青岛市",1569],["淄博市",1582],["枣庄市",1591],["东营市",1597],["烟台市",1603],["潍坊市",1616],["济宁市",1629],["泰安市",1641],["威海市",1648],["日照市",1653],["莱芜市",1658],["临沂市",1661],["德州市",1673],["聊城市",1685],["滨州市",1694],["菏泽市",1702],["郑州市",1713],["开封市",1726],["洛阳市",1734],["平顶山市",1750],["安阳市",1760],["鹤壁市",1770],["新乡市",1776],["焦作市",1789],["濮阳市",1801],["许昌市",1808],["漯河市",1815],["三门峡市",1821],["南阳市",1829],["商丘市",1843],["信阳市",1853],["周口市",1864],["驻马店市",1875],["武汉市",1887],["黄石市",1900],["十堰市",1907],["宜昌市",1916],["襄樊市",1930],["鄂州市",1940],["荆门市",1944],["孝感市",1950],["荆州市",1958],["黄冈市",1967],["咸宁市",1978],["随州市",1985],["恩施土家族苗族自治州",1988],["神农架",1997],["长沙市",2003],["株洲市",2013],["湘潭市",2023],["衡阳市",2029],["邵阳市",2042],["岳阳市",2055],["常德市",2065],["张家界市",2075],["益阳市",2080],["郴州市",2087],["永州市",2099],["怀化市",2111],["娄底市",2124],["湘西土家族苗族自治州",2130],["广州市",2140],["韶关市",2152],["深圳市",2163],["珠海市",2169],["汕头市",2173],["佛山市",2181],["江门市",2187],["湛江市",2195],["茂名市",2205],["肇庆市",2212],["惠州市",2221],["梅州市",2227],["汕尾市",2236],["河源市",2240],["阳江市",2247],["清远市",2252],["东莞市",2261],["中山市",2262],["潮州市",2263],["揭阳市",2267],["云浮市",2273],["南宁市",2280],["柳州市",2293],["桂林市",2304],["梧州市",2322],["北海市",2330],["防城港市",2335],["钦州市",2340],["贵港市",2345],["玉林市",2351],["百色市",2358],["贺州市",2371],["河池市",2376],["来宾市",2388],["崇左市",2395],["海口市",2404],["三亚市",2409],["重庆市",2430],["成都市",2470],["自贡市",2490],["攀枝花市",2497],["泸州市",2503],["德阳市",2511],["绵阳市",2518],["广元市",2528],["遂宁市",2535],["内江市",2541],["乐山市",2546],["南充市",2557],["眉山市",2567],["宜宾市",2574],["广安市",2585],["达州市",2591],["雅安市",2599],["巴中市",2608],["资阳市",2613],["阿坝藏族羌族自治州",2618],["甘孜藏族自治州",2632],["凉山彝族自治州",2651],["贵阳市",2670],["六盘水市",2680],["遵义市",2685],["安顺市",2700],["铜仁地区",2707],["黔西南布依族苗族自治州",2718],["毕节地区",2727],["黔东南苗族侗族自治州",2736],["黔南布依族苗族自治州",2753],["昆明市",2767],["曲靖市",2782],["玉溪市",2792],["保山市",2802],["昭通市",2808],["丽江市",2820],["思茅市",2826],["临沧市",2837],["楚雄彝族自治州",2846],["红河哈尼族彝族自治州",2857],["文山壮族苗族自治州",2871],["西双版纳傣族自治州",2880],["大理白族自治州",2884],["德宏傣族景颇族自治州",2897],["怒江傈僳族自治州",2903],["迪庆藏族自治州",2908],["拉萨市",2913],["昌都地区",2922],["山南地区",2934],["日喀则地区",2947],["那曲地区",2966],["阿里地区",2977],["林芝地区",2985],["西安市",2994],["铜川市",3006],["宝鸡市",3011],["咸阳市",3024],["渭南市",3039],["延安市",3051],["汉中市",3065],["榆林市",3077],["安康市",3090],["商洛市",3101],["兰州市",3110],["嘉峪关市",3118],["金昌市",3119],["白银市",3122],["天水市",3128],["武威市",3136],["张掖市",3141],["平凉市",3148],["酒泉市",3156],["庆阳市",3164],["定西市",3173],["陇南市",3181],["临夏回族自治州",3191],["甘南藏族自治州",3200],["西宁市",3210],["海东地区",3217],["海北藏族自治州",3224],["黄南藏族自治州",3229],["海南藏族自治州",3234],["果洛藏族自治州",3240],["玉树藏族自治州",3247],["海西蒙古族藏族自治州",3254],["银川市",3261],["石嘴山市",3268],["吴忠市",3272],["固原市",3277],["中卫市",3283],["乌鲁木齐市",3288],["克拉玛依市",3295],["吐鲁番地区",3300],["哈密地区",3304],["昌吉回族自治州",3308],["博尔塔拉蒙古自治州",3317],["巴音郭楞蒙古自治州",3321],["阿克苏地区",3331],["克孜勒苏柯尔克孜自治州",3341],["喀什地区",3346],["和田地区",3359],["伊犁哈萨克自治州",3368],["塔城地区",3379],["阿勒泰地区",3387],["石河子市",3395],["阿拉尔市",3396],["图木舒克市",3397],["五家渠市",3398],["普洱市",3429],["阿克苏市",4535]],
                // prevTextarea: '01=111 02=12 03=13 04=14 05=15',
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

                clipboard.writeText(this.nowTextarea, 'selection')
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
                if(!this.prevTextarea){
                    ElMessage({type: 'error', message: '请输入匹配内容'})
                    return
                }
                request(`https://www.haoshudi.com/${this.prevTextarea}.htm`,{},async (err,data,res)=>{
                    // console.log(err,data,res)
                    if(res){
                        let $ = cheerio.load(res);
                        let all = $('.mod-result > div.bd > table > tbody > tr:nth-child(2) > td:nth-child(2) > span').eq(0).text()
                        let provice = $('.mod-result > div.bd > table > tbody > tr:nth-child(2) > td:nth-child(2) > span a').eq(0).text()

                        this.a = provice
                        this.b = all.replace(provice,'')
                        console.log( all.replace(provice,'') )
                        let searchCity = all.replace(provice,'') ||  provice
                        console.log( searchCity )
                        let city = ''
                        for(let item of this.addressArr){
                            if( searchCity == item[0]){
                                city = item[1]
                            }
                        }
                        console.log(city)
                        if(city){
                            let nums = this.link.match(/city=(\d*)/)
                            // console.log(nums,'num')
                            // console.log(nums[1],'num')
                            // console.log(nums[0],'num')
                            // console.log(city,'city')
                            // console.log(this.link,'link')
                            this.nowTextarea = this.link.replace(nums[1], city)
                        }else{
                            ElMessage({type: 'error', message: '没匹配上'})
                        }
                    }else{
                    }
                })
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

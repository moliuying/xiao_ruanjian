const fetch = require('node-fetch');
const moment = require('moment');
let fs = require('fs')
let path = require('path')

const xlsx = require('node-xlsx');




// 从20200701 往后推30天 开始计算


// let allFiles = fs.readdirSync('./txt')


async function fn() {
    // 查询每一个日期 向前推30天的各个股票的 排名
    let allFiles1 = fs.readdirSync('./date')
    let allFiles2 = fs.readdirSync('./excel')
    let time = allFiles2.length ? allFiles2[allFiles2.length - 1].split('.')[0] : allFiles1[0].split('.')[0]
    time =  moment(time).add(1, 'day').format('YYYY-MM-DD')
    console.log(time)
    //往前推30天 每一个整理成一个excel
    let timeArr = []
    let mowStartTime = moment(time).subtract(30, 'days')

    let arr = ( fs.readFileSync(  './date/' + time +'.txt','utf8') ).split('\r\n')
    for(let i=0; i<=30; i++){
        timeArr.push( moment(mowStartTime).add(i, 'days').format('YYYY年M月D日') )
    }
    let exportArr = []
    exportArr.push([...timeArr,'股票'])
    getPaimingFn(time,arr,0,timeArr,-1, exportArr,[])
}
fn()


async function getPaimingFn(time,gupiaos,gupiaoIndex,times,timesIndex,exportArr,subArr) {
    
    if(gupiaoIndex >= gupiaos.length -1){
        console.log("股票采集完毕")
        // 把数据导出excel
        let buffer = xlsx.build([ { name: "sheet",  data:exportArr }]);
        time = moment(time, 'YYYY年M月D日').format('YYYY-MM-DD')
        fs.writeFileSync('./excel/'+  time+'.xlsx', buffer, {'flag': 'w'});
        console.log(times[times.length-1],"excel数据导出成功")
        fn()
    }else{
        let gupiao = gupiaos[gupiaoIndex]
        console.log("timesIndex--",gupiao,timesIndex)
        if(timesIndex>= times.length-1){
            subArr.push(gupiao)
            exportArr.push(subArr)
            // console.log(exportArr)
            // gupiaoIndex = gupiaos.length -1
            gupiaoIndex ++
            getPaimingFn(time,gupiaos,gupiaoIndex,times,0,exportArr,subArr)
            console.log("日期采集完毕")
        }else{
            timesIndex++
            console.log("timesIndex",timesIndex,times.length)
            let gupiao = gupiaos[gupiaoIndex]
            let time = times[timesIndex]
            let filePath = './tempData/'+gupiao+'_'+time+'.txt'
            if (!fs.existsSync(filePath)) {
                let sortIndex = await getPaiming(gupiao,time, 0)
                subArr.push(sortIndex)
                console.log(gupiao,time,sortIndex )
                fs.writeFileSync('./tempData/'+gupiao+'_'+time+'.txt', sortIndex.toString())
            }else{
                let sortIndex = fs.readFileSync(filePath,'utf8')
                subArr.push(sortIndex)
            }
            
            getPaimingFn(time,gupiaos,gupiaoIndex,times,timesIndex,exportArr,subArr)
        }
    }
}


function getPaiming (gupiao,time,hexinsIndex){
    let hexins = fs.readFileSync('./hexin.txt').split('\r\n')
    console.log("hexinsIndex---",hexins[hexinsIndex])
    console.log(gupiao,time)
    
    let obj = {
        "source":"Ths_iwencai_Xuangu",
        "version":"2.0",
        "query_area":"",
        "block_list":"",
        "add_info":"{'urp':{'scene':1,'company':1,'business':1},'contentType':'json','searchInfo':true}",
        "question": `${time}，${gupiao}， 热股`,
        "perpage":50,"page":1,
        "secondary_intent":"stock",
        "log_info":"{'input_type':'typewrite'}",
        "rsh":"Ths_iwencai_Xuangu_gsic7dcugrztdq3j8cf9iiv82cs8v0jx"
    }
    return new Promise((resolve)=>{
        fetch("https://www.iwencai.com/customized/chart/get-robot-data", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "zh-CN,zh;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "hexin-v": hexins[hexinsIndex],
                "pragma": "no-cache",
                "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                // "cookie": "other_uid=Ths_iwencai_Xuangu_gsic7dcugrztdq3j8cf9iiv82cs8v0jx; ta_random_userid=ypty1bctsw; cid=1704859450288e026ee8022e56c81e041701228343; u_ukey=A10702B8689642C6BE607730E11E6E4A; u_uver=1.0.0; u_dpass=1rwdiEi6B%2F2m0PQmbaLt1Z1iuhaSUvohh8kwhhQ6gfnyNfniBaHktNsbZHF7iOS%2F%2FsBAGfA5tlbuzYBqqcUNFA%3D%3D; u_did=460C62BD082E464886744B1259E7046F; u_ttype=WEB; user_status=1; SL_G_WPT_TO=zh; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; v=A8epJl30bjtRl-q1kF5YtPxUUHCUzJ-Z9aQfNZmy4W19FukuoZwr_gVwr2mq",
                // "Referer": "https://www.iwencai.com/unifiedwap/result?w=2020%E5%B9%B47%E6%9C%881%E6%97%A5%EF%BC%8C%E6%AD%8C%E5%B0%94%E8%82%A1%E4%BB%BD%EF%BC%8C%20%E7%83%AD%E8%82%A1&querytype=stock&addSign=1701255610454",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body":JSON.stringify(obj),
            "method": "POST"
        }).then(response => response.json()).then((res)=>{
            let strObj = res.data.answer[0].txt[0].content
            strObj = JSON.parse(strObj)
            let data  = strObj["components"][0].data.datas[0]
            console.log(data)
            resolve(data["个股热度排名"])
        }).catch((err)=>{
            console.log(err)
            hexinsIndex++
            if(hexinsIndex>= hexins.length){
                hexinsIndex = 0
            }
            resolve(getPaiming (gupiao,time,hexinsIndex))
        })
    })
}

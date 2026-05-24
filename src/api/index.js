
const API = {
    exportInExcel: ()=> `/index/exportInExcel`,
    getOneTaoBaoData: ()=> `/index/getOneTaoBaoData`,
    updateOneTaoBaoData: ()=> `/index/updateOneTaoBaoData`,
    getAllTaoBaoData: ()=> `/index/getAllTaoBaoData`,
    login: ()=> `/user/login`,
}

import axios from 'axios'
import { ElMessage } from 'element-plus'
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
// axios.defaults.adapter = require('axios/lib/adapters/http');
axios.defaults.withCredentials = true // 带cookie请求
// 开启拦截
axios.interceptors.response.use(async (res) => {
    console.log(res)
    console.log('--------')
    if((res.status == 200 || res.status == 201) && res.data.code == 200){
        return Promise.resolve(res.data)
    }else{
        ElMessage({message: res.data.msg, grouping: true, type: 'error' })
        // Message.error(res.data.msg)
    }
}, error => {
    ElMessage({message: '请求异常！请检查网络', grouping: true, type: 'error' })
    // Message.error('请求异常！请检查网络');
    return Promise.reject(error)
})

export function Ajax(url, data, method, headers) {
    console.log("axios.defaults.baseURL",axios.defaults.baseURL)
    return new Promise((resolve, reject) => {
        axios({
            url: API[url](data),
            method: method || 'post',
            headers: {
                'Content-Type': 'application/json',
                'uid': localStorage.getItem('uid'),
                ...headers
            },
            params: method === 'get' ? data : {},
            data: data,
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
}


import { createApp } from 'vue'
import App from './App.vue'
// 导入element UI库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { Ajax } from './api'

let moment = require('moment')

// 注册elementUi
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


// import list from './models/list'
// import user from './models/user'
// import detail from './models/detail'
// import xiangmu from "./models/xiangmu"
// import qiuguan from "./models/qiuguan"
// (async () => {
//     try {
//         // await Promise.all([
//         //     xiangmu.sync({force: false}),
//         //     qiuguan.sync({force: false})
//         // ])
//         await Promise.all([
//             user.sync({force: false}),
//             list.sync({force: false}),
//             detail.sync({force: false})
//
//         ]);
//     } catch (error) {
//         console.log(error);
//     }
// })();


// let db = require('./config/db');
// let Project = require("./models/project");
// (async () => {
//     try {
//         await Promise.all([
//             Project.sync({force: false})
//         ]);
//     } catch (error) {
//         console.log(error);
//     }
// })();


// D:\Sophia\sophia.exe" --user-data-dir=".\UserData"
// --profile-directory=Default
// --flag-switches-begin
// --flag-switches-end
// --file-url-path-alias="/gen=D:\Sophia\gen

// Sophia	90.0.4422.0 (开发者内部版本) （64 位）
// 修订版本	394a78b42658520a3b4699e126c8a5ab2ebb934a-refs/heads/master@{#838871}
// 操作系统	Windows 7 Service Pack 1 (Build 7601)
// JavaScript	V8 8.9.183
// 用户代理	Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4422.0 Safari/537.36
// 命令行	"D:\Sophia\sophia.exe" --user-data-dir=".\UserData" --profile-directory=Default --flag-switches-begin --flag-switches-end --file-url-path-alias="/gen=D:\Sophia\gen"
// 可执行文件路径	D:\Sophia\sophia.exe
// 个人资料路径	D:\Sophia\UserData\5gC2KCp3mdTQk5Jw0I2XxzG01cW5Ic51_abc68cd0a-3196-41a7-e859-c0e71dc76a46

app.config.globalProperties.Ajax = Ajax
app.config.globalProperties.moment = moment

app.use(ElementPlus)
app.mount('#app')

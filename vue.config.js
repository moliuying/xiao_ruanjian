
module.exports = {
//     chainWebpack: config => {
        // 使用 alias 简化路径
//         config.resolve.alias.set('@', resolve('/'))
//     },
    pluginOptions: {

        electronBuilder: {
             // List native deps here if they don't work
//               externals: ['my-native-dep'],
//               // If you are using Yarn Workspaces, you may have multiple node_modules folders
//               // List them all here so that VCP Electron Builder can find them
//               nodeModulesPath: ['../../node_modules', './node_modules'],
              nodeIntegration: true,
               "extraResources": {
                                // 拷贝静态文件到指定位置,否则打包之后出现找不到资源的问题.将整个resources目录拷贝到 发布的根目录下
                                "from": './软件资料/',
                                "to": '../软件资料',
                              },
            builderOptions: {
                "appId": "img_excel_20260531_1111",
//                 "productName": "图片分析汇总",//项目名，也是生成的安装文件名，即xxx.exe
//                 "productName": "软件集合",//项目名，也是生成的安装文件名，即xxx.exe
//                 "productName": "文本过滤",//项目名，也是生成的安装文件名，即xxx.exe
//                 "productName": "手机号解析",//项目名，也是生成的安装文件名，即xxx.exe
//                 "productName": "基本功出题软件",//项目名，也是生成的安装文件名，即xxx.exe
//                 "productName": "数据统计软件",//项目名，也是生成的安装文件名，即xxx.exe
                "productName": "照片分辨率修改",//项目名，也是生成的安装文件名，即xxx.exe
                "copyright": "Copyright © 2022 taobao",//版权信息
                "directories": {
                    "output": "./dist"//输出文件路径
                },
                'asar': false,
                "win": {
                    "icon": './public/nanjiren.ico',
//                     "target": ["portable"]
                    "target": [
                        {
                            "target": "nsis",
//                             "target": "portable",
                            "arch": [
                                "x64"
//                                 ,//64位
//                                 "ia32"//32位
                            ]
                        }
                    ]
                },
                "mac":{
//                     "icon": "./public/app.icns"
                },
                "nsis": {
                    "oneClick": false, // 是否一键安装
                    "perMachine": false,
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "installerIcon": "",// 安装图标
                    "uninstallerIcon": "",//卸载图标
                    "installerHeaderIcon": "", // 安装时头部图标
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true,// 创建开始菜单图标
//                     "shortcutName": "数据统计软件", // 图标名称
//                     "shortcutName": "基本功出题软件", // 图标名称
//                     "shortcutName": "图片处理", // 图标名称
//                     "shortcutName": "软件集合", // 图标名称
                    "shortcutName": "照片分辨率修改", // 图标名称
                }
            }
        }
    }
}

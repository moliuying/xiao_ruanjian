<template>
    <Index/>
</template>

<script>
    import Index from './components/Index.vue'
    //引入Koa
    const Koa = require('koa')
    //引入kao-json
    const json = require('koa-json')
    //引入koa-router
    const router = require('koa-router')()
    //所有的接口路由
    const routes = require('./routes/index')
    const ip = require('ip');



    export default {
        name: 'App',
        components: {
            Index
        },
        mounted() {
            //实例化Koa
            const app = new Koa()
            // app.use(json())
            // app.use(async (ctx) => {
            //     ctx.body = 'Hello World12'
            // })
            //启动路由
            // app.use(router.routes())



            app.use(routes)
            app.use(router.allowedMethods())

            app.listen(3000)
            console.log('启动成功。。。')
        }
    }
</script>

<style lang="scss">
    html, body, #app {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
    }
    .el-message {
        top: 200px !important;
    }
</style>

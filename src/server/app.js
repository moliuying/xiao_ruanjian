//引入Koa
const Koa = require('koa')
//引入kao-json
const json = require('koa-json')
//引入koa-router
const router = require('koa-router')()
//实例化Koa
const app = new Koa()
app.use(json())


app.use(async (ctx) => {
    ctx.body = 'Hello World12'
})

//启动路由
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
console.log('启动成功。。。')

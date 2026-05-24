let Router = require('koa-router');
let router = new Router();
const ip = require('ip')

router.get("/test",
    async (ctx, next) =>{
        try {
            console.log("123455")
            var myip = ip.address();
            console.log(myip)
            ctx.body = myip
        } catch (e) {
            throw e;
        }
    }
);



/*
 * expose
 */
module.exports = router.routes();

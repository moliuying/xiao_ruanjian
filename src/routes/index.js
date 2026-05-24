


let Router = require('koa-router');
let router = new Router();


let user_router = require("./user_route");
router.use(async (ctx, next) => {
    console.log(6666);
    console.log( ctx.request.ip )
    console.log( ctx.request.ips )
    ctx.type = 'json';
    await next();
});


router.use("/user", user_router);
module.exports = router.routes();


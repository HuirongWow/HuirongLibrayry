const Koa = require('koa')
const app = new Koa()
const koalog = require('./koa-logger')
function delay(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },1000)
    })
    }
app.use(koalog)
app.use(async(ctx,next)=>{
    // console.log(ctx)
    if(ctx.require.url=='/'){
        ctx.body = '大圣'
    }else if(ctx.require.url=='zhubajie'){
        ctx.body = '猪八戒'
    }else{
        ctx.body = '<h1>404 not found</h1>'
    }
    ctx.body = '1'                                                                                                                                                                  
    // 下一个中间件
    await next()
    ctx.body = ctx.body + '2'
})
// 当我只在第二个中间件里加了await时,并没有达到想象中"延迟一秒再渲染页面"的效果
// 究其原因是,没有给第一个中间件的'next()'添加await,告诉它等待第二个中间件执行完.
// 最好给每一个中间件都加await
app.use(async(ctx,next)=>{
    ctx.body += '3'
    await delay()
    // 下一个中间件
    await next()
    ctx.body = ctx.body + '4'
})
app.use(async(ctx,next)=>{
    ctx.body += '5'
    // 下一个中间件
    await next()
    ctx.body = ctx.body + '6'
})

// app.use(async(ctx,next)=>{
//     ctx.body = 'hello koa'
// })

app.listen(3000)
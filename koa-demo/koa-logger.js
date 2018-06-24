// module.exports = async(ctx,next)=>{
//     const start = new Date().getTime()
//     await next()
//     const end = new Date().getTime()
//     console.log(ctx.request.url,end-start,)
// }
// 实现功能:遍历所有中间件,记录进进出出的所有时间
module.exports = async(ctx,next)=>{
    const start = new Date().getTime()
    // 保证这个中间件在最外层
    await next()
    const end = new Date().getTime()
    console.log(ctx.request.url,end-start,ctx.body.length)
}
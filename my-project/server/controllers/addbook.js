
const https = require('https')
const {mysql} = require('../qcloud')


// 新增图书
// https://api.douban.com/v2/book/isbn/:name
// https://api.douban.com/v2/book/isbn/9789889955991
// 1.获取豆瓣信息（得到json），转化为对象，再将需要用的到属性存起来
// 2.入库
module.exports = async (ctx)=>{
    const {isbn,openid} = ctx.request.body
    if (isbn && openid) {
        const findRes = await mysql('books').select().where('isbn', isbn)
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }
    
        let url = 'https://api.douban.com/v2/book/isbn/'+isbn
        const bookinfo = await getJSON(url)
        const rate = bookinfo.rating.average
        const { title,image,alt,publisher,summary,price} = bookinfo
        console.log(bookinfo)
        const tags = bookinfo.tags.map(v=>{
            return `${v.title} ${v.count}`
        }).join(',')
        console.log(tags)
        const author = bookinfo.author.join(',')
        // 图书信息入库,mysql插入数据是一个异步的过程。需要用try catch做错误处理
        try{
            await mysql('books').insert({
                        isbn,openid,rate,title,image,alt,publisher,summary,price,tags,author
                    })
                    ctx.state.data = {
                        title,
                        msg:'success'
                    }
        }catch(e){
            ctx.state = {
                // 0是正确，-1是错误
                code:-1,
                // 对外暴露的sql的错误信息
                data:{
                    msg:'新增失败：'+e.sqlMessage
                }
            }
        }
        
      
        // tag: 科幻 1000, 小说 500
    }    
}

// 通过node自带的https来获得json,以promise返回
function getJSON(url){
    return new Promise((resolve,reject)=>{
        https.get(url,res=>{
            let urlData = ''
            res.on('data',data=>{
                urlData += data
            })

            res.on('end',data=>{
                const bookinfo = JSON.parse(urlData)
                if(bookinfo.title){
                    resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}

// function getJSON (url) {
//     return new Promise((resolve, reject) => {
//         https.get(url, res => {
//             let urlData = ''
//             res.on('data', data => {
//                 urlData += data
//             })
//             res.on('end', data => {
//                 const bookinfo = JSON.parse(urlData)
//                 if (bookinfo.title) {
//                     resolve(bookinfo)
//                 }
//                 reject(bookinfo)
//             })
//         })
//     })
// }
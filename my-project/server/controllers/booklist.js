

const {mysql} = require('../qcloud')
module.exports = async (ctx)=>{
    // 加上page判断,实现下拉刷新功能，相当于分页
    const {page} = ctx.request.query
    const size = 10

    // 为了查到捐赠人的名字，需要做复杂的链表查询,同时利用page设置起点长度
    const books = await mysql('books')
                        .select('books.*','cSessionInfo.user_info')
                        .join('cSessionInfo','books.openid','cSessionInfo.open_id')
                        .limit(size)
                        .offset(Number(page) * size)
                        .orderBy('books.id','desc')
    // .orderBy('id','desc')
    ctx.state.data = {
        list:books.map(v=>{
            const info = JSON.parse(v.user_info)
            return Object.assign({},v,{
                user_info:{
                    nickName:info.nickName
                }
            })
        })
    } 
}

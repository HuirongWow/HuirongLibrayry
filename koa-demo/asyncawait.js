// import { resolve } from "url";
// import { rejects } from "assert";


// function ajax(fn){
//     setTimeout(()=>{
//         console.log('你好')
//         fn()    
//     },1000)
// }
// ajax(()=>{
//     console.log('执行结束')
// })
// setTimeout并不阻塞我们的代码
// 1.callback解决异步:  项目复杂时,多个请求导致回调地狱
// promise 下一步异步的解决方案 类似承诺
function delay(word){
return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('hello' + word)
    },2000)
})
}
// async+await一定要一起使用,
// async定义一个函数
// awiat必须再async内部,等待异步执行执行结束,看不出异步的痕迹,同步的样式
async function start(){
    const word1 = await delay('孙悟空')
    console.log(word1);
    const word2 = await delay('猪八戒')
    console.log(word2);
    const word3 = await delay('沙悟净')
    console.log(word3);
}
start();
// delay('孙悟空')
//     .then((word)=>{
//         console.log(word)
//         return delay('猪八戒')
//     })
//     .then((word)=>{
//         console.log(word)
//         return delay('沙悟净')
//     })
//     .then((word)=>{
//         console.log(word)
//     })
<script>
// import {get,showSuccess} from './util'
// import qcloud from 'wafer2-client-sdk'
// import config from './config'
export default {
  async created () {
    //       let usr = wx.getStorageSync('userinfo')
    //       if(!usr){
    //       // 设置登录地址
    //         qcloud.setLoginUrl(config.loginUrl);
    //         qcloud.login({
    //         success: function (userInfo) {
    //             console.log('登录成功', userInfo);
    //             showSuccess('登陆成功')
    //             wx.setStorageSync('userinfo',userinfo);
    //         },
    //         fail: function (err) {
    //             console.log('登录失败', err);
    //         }
    //         });
    // }

    // console.log('Here')
    // const res = await get('/weapp/demo')
    // console.log(123, res)
    // // wx.request({
    // //     url:config.host+'/weapp/demo',
    // //     success:function(res){
    // //         console.log(res)
    // //     }
    // // })
    console.log('小程序启动')
  }
}
</script>
<style>
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom: 5px;
}
.text-primary{
  color:#EA5149;
}
.btn{
    color:white;
    background: #EA5A49;
    margin-bottom: 10px;
    padding-left: 15px;
    
    border-radius: 2px;
    font-size: 16px;
    line-height: 40px;
    height: 40px;
    width: 100%;
}
.btn:active{
    background: #fa5a49
}
</style>

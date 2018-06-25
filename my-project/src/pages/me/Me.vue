<template>
    <div class="container">
        <!-- <div class="userinfo" @click="login">改版之前的逻辑 -->
        <div class="userinfo">    
            <img  :src="userinfo.avatarUrl" alt="">
            <p>{{userinfo.nickName}}</p>
        </div>
        <YearProgress></YearProgress>
        <button v-if='userinfo.openId' @click="scanBook" class="btn">添加图书</button>
        <!-- 改版之后的button获取用户信息 -->
        <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>

        <!-- <button v-else open-type="getUserInfo" lang="zh_CN"  class='btn' @getuserinfo="login">点击登陆</button> -->
    </div>  
</template>
<script>
import {showSuccess, showModal, post} from '@/util'
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import YearProgress from '@/components/YearProgress'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
        nickName: ''
      }
    }
  },
  methods: {
    async addBook (isbn) {
      console.log(isbn)
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      if (res.code === 0 && res.data.title) {
        showSuccess('添加成功', `${res.data.title}添加成功`)
      }
    },
    //   扫码功能
    scanBook () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            console.log('saoma')
            this.addBook(res.result)
            // console.log('saoma1')
          }
          console.log(res)
        }
        // fail (error) {
        //       console.log('失败')
        //     }
      })
    },
    getWxLogin: function ({encryptedData, iv, userinfo}) {
      const self = this
      wx.login({
        success: function (loginResult) {
          console.log('loginResult', loginResult)
          var loginParams = {
            code: loginResult.code,
            encryptedData: encryptedData,
            iv: iv
          }
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            loginParams,
            success () {
              // 获取用户信息
              qcloud.request({
                url: config.userUrl,
                login: true,
                success (userRes) {
                  showSuccess('登陆成功')
                  wx.setStorageSync('userinfo', userRes.data.data)
                  self.userinfo = userRes.data.data
                }
              })
            },
            fail (error) {
              showModal('登录失败', error)
            }
          })
        },
        fail: function (loginError) {
          showModal('登录失败', loginError)
        }
      })
    },
    login (e) {
      const self = this
      wx.getSetting({
        success: function (res) {
          // 查看授权信息里是否有用户信息
          if (res.authSetting[`scope.userInfo`]) {
            //  检查用户的登陆信息是否过期了
            wx.checkSession({
              success: function () {
                // 没有过期，直接登陆成功
                showSuccess('登陆成功！')
              },
              fail: function () {
                // 过期，需重新登陆 先清除掉登陆的状态
                qcloud.clearSession()
                // 登陆状态过期需重新登陆
                // 登陆需要的加密信息
                var options = {
                  encryptedData: e.mp.detail.encryptedData,
                  iv: e.mp.detail.iv,
                  userinfo: e.mp.detail.userinfo
                }
                self.getWxLogin(options)
              }
            })
          } else {
            showModal('用户未授权', e.mp.detail.errMsg)
          }
        }
      })
    }
  },
  // login(){
  // let usr = wx.getStorageSync('userinfo')
  // const self = this
  // if(!usr){
  // // 设置登录地址
  //     qcloud.setLoginUrl(config.loginUrl);
  //     qcloud.login({
  //     success: function (userinfo) {
  //         // console.log('登录成功', userinfo);
  //         showSuccess('登陆成功')
  //         qcloud.request({
  //             url:config.userurl,
  //             login:true,
  //             // 又调用了一次url的接口以得到我们想要的openId来判断用户是否登陆
  //             success(userRes){
  //                 showSuccess('登陆成功')
  //                 wx.setStorageSync('userinfo',userRes.data.data);
  //                 self.userinfo = userinfo
  //             }
  //         })
  //     },
  //     fail: function (err) {
  //         console.log('登录失败', err);
  //     }
  //     });
  //         }
  // },
  onShow () {
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
  // created(){
  //     this.userinfo = wx.getStorageSync('userinfo')
  //     console.log(this.userinfo)
  // }
}
</script>
<style lang='scss'>
.container{
    padding: 0 30rpx;
}
.userinfo{
    margin-top:100rpx;
    text-align:center;
    img{
        width:150rpx;
        height:150rpx;
        margin:20rpx;
        border-radius:50%;
    }
}
</style>

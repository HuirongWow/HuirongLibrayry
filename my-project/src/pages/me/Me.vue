<template>
    <div class="container">
        <div class="userinfo">
            <img class="" src="userinfo.avatarUrl" alt="">
            <p>{{userinfo.name}}</p>
        </div>
        <YearProgress></YearProgress>
        <buttton @click="scanBook" class="btn">添加图书</buttton>
    </div>  
</template>
<script>
import YearProgress from '@/components/YearProgress'
export default {
data(){
    return{
        userinfo:{}
    }
},
methods:{
    scanBook(){
       wx.scanCode({
           success:(res)=>{
               console.log(res)
           }
       })
    }

},
created(){
    this.userinfo = wx.getStorageSync('userinfo')
    console.log(this.userinfo)
}
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
        width:18rpx;
        height:18rpx;
        margin:20rpx;
        border-radius:50%;
    }
}
</style>

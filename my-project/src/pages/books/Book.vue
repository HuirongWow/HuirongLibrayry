<template>
    <div>
        <Card :key='book.id' v-for='book in books' :book='book'></Card>    
        <p class='text-footer' v-if='!more'>没有更多数据</p>
    </div>
</template>
<script>
// 35条
// 每次加载10条
// 1页 0-10
// 2页 10-20
// 3页 30-40（5）
// page 当前第几页

// 没有更多数据
// 1.page = 0 不能显示这条提醒
// 2.page> > 0 数据长度<10 停止触底加载
// 对more进行控制
import {get} from '@/util'
import Card from '@/components/Card'
export default {
  components: {
    Card
  },
  data () {
    return {
      books: [],
      page:0,
      more:true
    }
  },
  methods: {
    async getList (init) {
        if(init){
            this.page = 0
            this.more = true
        }
        // 下拉刷新
      wx.showNavigationBarLoading()
      const books = await get('/weapp/booklist',{page:this.page})
      this.books = books.list
      if(books.list.length<10 && this.page>0){
          this.more = false
      }
    //   如果是init的状态，可以直接覆盖显示图书列表
      if(init){
          this.books = books.list
          wx.stopPullDownRefresh
      }
      else{
        //   如果是继续下拉刷新，不能直接覆盖books 而是累加到已有的图书列表后面
        this.books = this.books.concat(books.list)
      }
      wx.hideNavigationBarLoading()
    },
    async getTop(){
        const tops = await get('/eapp/top')
        this.tops = tops.list
    }
  },
  onPullDownRefresh(){
      this.getList(true)
    //   console.log('下拉')
      this.getTop()
  },
  onReachBottom(){
      if(!this.more){
        //   没有更多了
        return false
      }
      this.page = this.page+1
      this.getList()
  },
  mounted () {
    this.getList(true)
    this.getTop()
  }
}
</script>
<style lang='scss'>
</style>

<template>
    <div>图书id：{{bookid}}</div>
</template>

<script>
import { get } from '@/util'
export default {
    data(){
        return {
            bookid:''
        }
    },
    method:{
        async getDetail(){
            const info = await get('/weapp/bookdetail',{id:this.bookid})
        }
    },
    mounted(){
        // 获取id,mpVue的写法，mpvue.com,获取传递的option
        this.bookid = this.$root.$mp.query.id
        this.getDetail()
    }
}
</script>

<style>

</style>

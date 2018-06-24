<template>
    <div>
        <p>进度条123</p>
        <progress :persent='persent' activeColor='EA5A49'></progress>
        <p>{{year}}已经过去了{{days}}天，{{persent}}%</p>
    </div>
</template>

<script>
export default {
    methods:{
        isLeapYear(){
            const year = new Date().getFullYear()
            if(year %400===0){
                return true;
            }else if(year%4==00 && year%100!==0){
                return true;
            }else{
                return false;
            }
        },
        getDayOfYear(){
            return this.isLeapYear()?366:365
        }
    },
    computed:{
        year(){
            return new Date().getFullYear()
        },
        days(){
            let start = new Date();
            start.setMonth(0)
            start.setDate(1)
            let offset = new Date().getTime()-start.getTime();
            return parseInt(offset/1000/60/60/24)+1
        },
        persent(){
            rwturn (this.days*100/getDayOfYear()).tofixed(1)
        }
    }
}
</script>

<style lang='scss'>
.progressbar{
    text-align: center;
    margin-bottom: 40px;
    margin-top: 10px;
    width:100%;
    progress{
        margin-bottom:10px;
    }
}
</style>

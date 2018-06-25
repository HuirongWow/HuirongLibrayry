<template>
    <div class="progressbar">
        <p>人生苦短，珍惜时间</p>
        <progress :percent='percent' activeColor='green'></progress>
        <p>{{year}}已经过去了{{days}}天，{{percent}}%</p>
    </div>
</template>

<script>
export default {
  methods: {
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear () {
      return this.isLeapYear() ? 366 : 365
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      let offset = new Date().getTime() - start.getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    percent () {
      return (this.days * 100 / this.getDayOfYear()).toFixed(1)
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

<template>
    <div class="star_style">
      <img src="../../../static/images/star_on.png" alt="" class="star" v-for="(v,k) in 5" :key="k"
           v-show="score>=k+1">
      <img src="../../../static/images/star_half.png" alt="" class="star" v-show="score*10%10>=5">
      <img src="../../../static/images/star_off.png" alt="" class="star" v-for="(v,k) in 5" :key="k"
           v-show="score<=k">
    </div>
</template>

<script>
    export default{
        props:["score"],
      computed:{

      }
    }
</script>

<style lang="less" scoped>
  .star_style{
    display: flex;
    .star {
      width: 0.30rem;
      height: 0.29rem;
    }

  }
</style>

<template>
    <div id="app">
        <v-header></v-header>
        <div class="nav">
          <router-link to="/goods" class="nav_router">商品</router-link>
          <router-link to="/ratings" class="nav_router">评价</router-link>
          <router-link to="/seller" class="nav_router">商家</router-link>
        </div>

      <div>
        <router-view></router-view>
      </div>
      <foot></foot>

    </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    import Header from './components/header/header.vue'
    import foot from "./components/main_modules/foot.vue"
    export default{
        components:{
          "v-header":Header,
          foot
        }
    }
</script>

<style lang="less" scoped>
  #app{
    position: relative;
    .nav{
      box-sizing: border-box;
      height:0.80rem;
      display: flex;
      justify-content: space-around;
      border-bottom:0.01rem solid rgba(7,17,27,0.1);
       .nav_router{
         font-size: 0.28rem;
         line-height:0.80rem;
         color: rgb(77,85,93)
       }
      .router-link-active{
        color:red;
      }
    }
  }

</style>

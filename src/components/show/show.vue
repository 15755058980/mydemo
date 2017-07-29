<template>
  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="show" v-if="showFlag" @click="hide">
      <div class="bgk"></div>
      <p class="title">{{seller.name}}</p>
      <div class="star">
        <div  class="star_show">
          <img src="../../../static/images/star_on.png" alt="" class="seller_star"  v-for="(v,k) in 5" :key="k" v-show="seller.score>=k+1">
          <img src="../../../static/images/star_half.png" alt="" class="seller_star"  v-show="seller.score*10%10>5">
          <img src="../../../static/images/star_off.png" alt="" class="seller_star" v-for="(v,k) in 5" :key="k" v-show="Math.round(seller.score)<k+1">
        </div>
      </div>
      <div class="discount">
        <div class="discount_line"></div>
        <p class="discount_info">优惠信息</p>
        <div class="discount_line"></div>
      </div>
      <ul class="activity">
        <li v-for="(v,k) in seller.supports" :key="k"  class="activity_group">
          <img src="../../../static/images/decrease.png" alt="" v-if="v.type==0" class="activity_img">
          <img src="../../../static/images/discount.png" alt="" v-if="v.type==1" class="activity_img">
          <img src="../../../static/images/special.png" alt="" v-if="v.type==2" class="activity_img">
          <img src="../../../static/images/invoice.png" alt="" v-if="v.type==3" class="activity_img">
          <img src="../../../static/images/guarantee.png" alt="" v-if="v.type==4" class="activity_img">
          <p class="discount_text">{{v.description}}</p>
        </li>
      </ul>
      <div class="discount notice">
        <div class="discount_line"></div>
        <p class="discount_info">商家公告</p>
        <div class="discount_line"></div>
      </div>
      <p class="notice_text">{{seller.bulletin}}</p>
      <div class="icon_close" @click="hide">
        <i class="icon iconfont icon-X"></i>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import "animate.css/animate.css"
    export default{
      computed:{
        ...mapGetters(["seller","showFlag"])
      },
      methods:{
          hide(){
              this.$store.dispatch("hideDetail")
          }
      },
      created(){
          console.log(this.showFlag)
      }
    }
</script>

<style scoped lang="less">
  .show{
    position: fixed;
    width:100%;
    height:100%;
    z-index: 999;
    .bgk{
      position: fixed;
      left:0;
      right:0;
      bottom:0;
      top:0;
      width:100%;
      height:100%;
      background-color: rgba(7,17,27,0.8);
      filter: blur(0.1rem);
      z-index:-1
    }
    .title{
      color:white;
      font-size: 0.32rem;
      font-weight: 700;
      line-height: 0.32rem;
      margin-top:1.28rem;
      text-align: center;
    }
    .star{
      text-align: center;
      height:0.48rem;
      margin:0.32rem auto 0.56rem;
    }
    .discount{
      height:0.28rem;
      padding:0 0.72rem;
      display: flex;
      justify-content: space-between;
      line-height:0.28rem;
      /*!*justify-content:center;*!*/
      align-items:center;
      .discount_line{
        width:2.24rem;
        height:0.02rem;
        background-color: rgba(255,255,255,0.2);
      }
      .discount_info{
        font-size: 0.28rem;
        margin:0;
        font-weight:700;
        color:rgb(255,255,255)
      }
    }
    .activity{
      padding: 0 0.86rem;
      margin-top:0.48rem;
      .activity_group{
        display: flex;
        margin-bottom:0.24rem;
        font-size: 0.24rem;
        font-weight:200;
        line-height:0.32rem;
        color: rgb(255,255,255);
        .activity_img{
          height:0.32rem;
          width:0.32rem;
          margin-right:0.12rem;
        }
        .discount_text{
          margin:0;
        }
      }

    }
    .notice{
      margin-top:0.32rem;
    }
    .notice_text{
      margin:0.48rem 0.86rem 0;
      color:rgb(255,255,255);
      font-size: 0.24rem;
      font-weight:200;
      line-height:0.48rem;
    }
    .icon_close{
      position: fixed;
      left:48%;
      bottom:0.64rem;
      color:rgba(255,255,255,0.5);
      font-size: 0.64rem;
      z-index:999;
    }


  }
</style>

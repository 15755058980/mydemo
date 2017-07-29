<template>
  <div class="seller" ref="sellerMain">
    <div>
      <div class="seller_info_header">
        <div class="seller_info_header_left">
          <p class="seller_title">{{seller.name}}</p>
          <div class="star_show">
            <star :score="seller.score"></star>
            <p class="seller_count">({{seller.sellCount}})</p>
            <p class="seller_count seller_month">月售 222  单</p>
          </div>

        </div>
        <div class="seller_info_header_right">
          <div class="change_collect_icon">
            <i class="iconfont icon-xin collect_icon" v-show="collectFlag" @click="showCollectFlag"></i>
            <i class="iconfont icon-xin1 collect_icon" v-show="!collectFlag" @click="showCollectFlag"></i>
          </div>
          <p v-show="collectFlag" class="collect_text">收藏</p>
          <p v-show="!collectFlag" class="collect_text">已收藏</p>
        </div>
      </div>
      <v-line></v-line>
      <div class="seller_info_body">
        <div class="seller_info_body_left seller_info_body_box">
          <p class="seller_info_text">起送价</p>
          <p class="seller_info_text"><span class="seller_info_body_strong">{{seller.minPrice}}</span>元</p>
        </div>
        <div class="seller_info_body_center seller_info_body_box">
          <p class="seller_info_text">商家配送</p>
          <p class="seller_info_text"><span class="seller_info_body_strong">{{seller.deliveryPrice}}</span>元</p>
        </div>
        <div class="seller_info_body_right seller_info_body_box">
          <p class="seller_info_text">平均送达时间</p>
          <p class="seller_info_text"><span class="seller_info_body_strong">{{seller.deliveryTime}}</span>分钟</p>
        </div>
      </div>
      <split></split>
      <div class="seller_notice">
        <p class="seller_notice_title">公告与活动</p>
        <p class="seller_notice_content">{{seller.bulletin}}</p>
      </div>
      <v-line></v-line>
      <ul class="seller_activity" v-for="(v,k) in seller.supports" :key="k">
        <li class="seller_activity_group">
          <img src="../../../static/images/decrease.png" alt="" v-if="v.type==0" class="seller_activity_img">
          <img src="../../../static/images/discount.png" alt="" v-if="v.type==1" class="seller_activity_img">
          <img src="../../../static/images/special.png" alt="" v-if="v.type==2" class="seller_activity_img">
          <img src="../../../static/images/invoice.png" alt="" v-if="v.type==3" class="seller_activity_img">
          <img src="../../../static/images/guarantee.png" alt="" v-if="v.type==4" class="seller_activity_img">
          <p class="seller_discount_text">{{v.description}}</p>
        </li>
        <v-line></v-line>
      </ul>
      <split></split>
      <div class="seller_house">
        <p class="seller_house_title">商家实景</p>
        <div ref="seller_house_img" class="seller_scroll_img">
          <div style="white-space: nowrap">
            <img :src="v" alt="" v-for="(v,k) in seller.pics" :key="k" class="seller_house_img" @load="loading">
          </div>

        </div>
      </div>
      <split></split>
      <div class="seller_info_foot">
        <p class="seller_info_title">商家详情</p>
        <ul>
          <li v-for="(val,key) in seller.infos">
            <v-line></v-line>
            <p v-text="val" class="seller_info_foot_text"></p>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import BetterScroll from "better-scroll"
  import star from '../util_comp/star.vue'
  import split from '../util_comp/split.vue'
  import line from '../util_comp/line.vue'
  export default {
    data(){
      return {
        bsll: null
      }
    },
    computed: {
      ...mapGetters([
        'seller', "collectFlag"
      ])
    },
    created(){
      this.$store.dispatch('getSeller');
      setTimeout(() => {
        this.bsll = new BetterScroll(this.$refs.sellerMain, {
          click: true
        });
        this.imgscroll = new BetterScroll(this.$refs.seller_house_img, {
          scrollX: true
        });
        this.getimgscroll();
      }, 30)

    },
    methods: {
      showCollectFlag(){
        this.$store.dispatch('showCollectFlag');
      },
      getimgscroll(){
        this.img = this.$refs.seller_house_img;
        console.log(this.img.children[0].clientWidth);


//        this.img.children[0].clientWidth=0
//        for(let i = 0;i< this.img.children[0].children.length;i++){
//          this.img.children[0].clientWidth += (2.40+0.12)
//        }
//        this.img.children[0].clientWidth = 10+"rem"
//        console.log(this.img.children[0].clientWidth)
      },
      loading(){
          setTimeout(()=>{
        this.imgscroll.refresh()

          },20)
      }
    },
    components: {
      star,
      split,
      "v-line": line
    }
  }
</script>

<style lang="less">
  .seller {
    position: fixed;
    top: 3.48rem;
    bottom: 0.92rem;
    overflow: hidden;
    .seller_info_header {
      position: relative;
      display: flex;
      .seller_info_header_left {
        margin: 0.36rem;
        .seller_title {
          margin-bottom: 0.16rem;
          height: 0.28rem;
          font-size: 0.28rem;
          color: rgb(7, 17, 27);
          line-height: 0.28rem;
          font-weight: 200;
        }

        .star_show {
          display: flex;
          .seller_count {
            margin: 0 0.24rem 0 0.16rem;
            font-size: 0.20rem;
            color: rgb(75, 85, 93);
            line-height: 0.36rem;
          }
          .seller_month {
            margin: 0;
          }
        }
      }
      .seller_info_header_right {
        position: fixed;
        top: 0.60rem;
        right: 0.36rem;
        .change_collect_icon {
          width: 1.0rem;
          text-align: center;
          .collect_icon {
            font-size: 0.48rem;
            cursor: pointer;
          }
          .icon-xin1 {
            color: rgb(240, 20, 20);
          }

        }
        .collect_text {

          line-height:0.28rem;
          text-align: center;
          font-size: 0.20rem;
          color: rgb(77, 85, 93);

          margin-top: 0.08rem;

        }
      }
    }
    .seller_info_body {
      margin: 0.36rem 0;
      display: flex;
      .seller_info_body_box {
        width: 33%;
      }
      .seller_info_text {
        text-align: center;
        font-size: 0.20rem;
        color: rgb(147, 153, 159);
        margin-bottom: 0.08rem;
        .seller_info_body_strong {
          font-size: 0.48rem;
        }
      }
      .seller_info_body_left {
        border-right: 0.01rem solid rgba(7, 17, 27, 0.1);
      }
      .seller_info_body_center {
        border-right: 0.01rem solid rgba(7, 17, 27, 0.1);
      }
    }

    .seller_notice {
      margin: 0.36rem;
      .seller_notice_title {
        font-size: 0.28rem;
        color: rgb(7, 17, 27);
        line-height: 0.28rem;
        font-weight: 200;
      }
      .seller_notice_content {
        margin: 0.32rem 0.24rem;
        font-size: 0.24rem;
        line-height: 0.48rem;
        font-weight: 200;
        color: rgb(240, 20, 20);
      }
    }
    .seller_activity {
      .seller_activity_group {
        display: flex;
        margin: 0.32rem 0.70rem;
        .seller_activity_img {
          width: 0.30rem;
          height: 0.29rem;
          margin-right: 0.12rem;
        }
      }

    }
    .seller_house {
      padding: 0.36rem 0 0.36rem 0.12rem;
      .seller_house_title {
        margin-left: 0.24rem;
        font-size: 0.28rem;
        color: rgb(7, 17, 27);
        line-height: 0.28rem;
        font-weight: 200;
        margin-bottom: 0.24rem;
      }
      .seller_scroll_img{
        width:7.0rem;
        display: flex;
        div{
          .seller_house_img {
            display: inline-block;
            width: 2.40rem;
            height: 1.80rem;
            margin-left: 0.12rem;
          }
        }
      }



    }
    .seller_info_foot{
      margin-top:0.36rem;
      .seller_info_title{
        margin-left:0.36rem;
        font-size: 0.28rem;
        line-height:0.28rem;
        margin-bottom: 0.24rem;
      }
      ul{
        li{
          .seller_info_foot_text{
            font-size: 0.24rem;
            line-height:0.32rem;
            font-weight: 200;
            color: rgb(7,17,27);
            margin:0.36rem 0.60rem;
          }
        }
      }

    }

  }
</style>

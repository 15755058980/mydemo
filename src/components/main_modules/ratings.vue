<template>
    <div class="ratings">
      <div class="ratings_header">
        <div class="ratings_header_left">
          <p class="ratings_header_left_text1">{{seller.score}}</p>
          <p class="ratings_header_left_text2">综合评分</p>
          <p class="ratings_header_left_text3">高于周边商家</p>
        </div>
        <div class="ratings_header_right">
          <p class="ratings_header_right_text1 ratings_header_right_text">
            <span class="attitude">服务态度</span>
            <star :score="Number(score.toString().match(/^\d+(?:\.\d{0,1})?/))"></star>
            <span class="atti_score">{{Number(score.toString().match(/^\d+(?:\.\d{0,1})?/))}}</span>
          </p>
          <p class="ratings_header_right_text2 ratings_header_right_text">
            <span class="attitude">服务态度</span>
            <star :score="Number(score.toString().match(/^\d+(?:\.\d{0,1})?/))"></star>
            <span class="atti_score" v-text="Number(score.toString().match(/^\d+(?:\.\d{0,1})?/))"></span>
          </p>
          <p class="ratings_header_right_text3 ratings_header_right_text">
            <span class="attitude">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
          </p>
        </div>
      </div>
      <split></split>
      <div class="ratings_title">
        <div class="ratings_title_router">
          <div class="all ratings_title_router_link"><router-link to="/ratings/all" class="ratings_title_router_link_text">全部<span v-text="ratings.length"></span></router-link></div>
          <div class="satisfaction ratings_title_router_link"><router-link to="/ratings/satisfaction">满意<span v-text="count"></span></router-link></div>
          <div class="unsatisfactory ratings_title_router_link"><router-link to="/ratings/unsatisfactory">不满意<span v-text="ratings.length-count"></span></router-link></div>
        </div>
        <v-line></v-line>
        <p class="check_ratings">
          <i class="icon iconfont icon-duihao" @click="checkOnly" v-show="ratingsFlag==0"></i>
          <i class="icon iconfont icon-duihao icon-click" @click="checkOnly" v-show="ratingsFlag==1"></i>
          <span>只看有内容的评价</span>
        </p>
      </div>
      <div class="split_line"></div>
      <div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import star from '../util_comp/star.vue'
  import split from '../util_comp/split.vue'
  import line from '../util_comp/line.vue'
  export default{
      data(){
          return{
            count:0
          }
      },
      computed:{
        ...mapGetters(["ratings","seller","ratingsFlag"]),
        score(){
          let sum = 0;
          this.count = 0;
          this.ratings.forEach((v,i)=>{
            sum += v.score;
            if(v.score>3) this.count++;
          });
          return sum/this.ratings.length
        }

      },
      created(){
        this.$store.dispatch("getRatings");
      },
      components:{
        star,
        split,
        "v-line":line
      },
    methods:{
      checkOnly(){
        this.$store.dispatch("showText")

      }

    }

  }

</script>

<style lang="less" scoped>
  .ratings{

    .ratings_header{
      display: flex;
      margin:0.36rem 0;
      .ratings_header_left{
        width:2.75rem;
        text-align: center;
        border-right:0.01rem solid rgba(147,153,159,0.2);
        .ratings_header_left_text1{
          font-size: 0.48rem;
          color: rgb(255,153,0);
          font-weight:700;
          line-height:0.56rem;
        }
        .ratings_header_left_text2{
          font-size: 0.24rem;
          color: rgb(7,17,27);
          font-weight:200;
          margin-top:0.12rem;
        }
        .ratings_header_left_text3{
          font-size: 0.20rem;
          color: rgb(147,153,159);
          font-weight:700;
          line-height:0.20rem;
          margin-top:0.16rem;
        }
      }
      .ratings_header_right{
        margin:0 0.48rem;

        .ratings_header_right_text {
          display: flex;
          margin-top: 0.16rem;
          .attitude {
            font-size: 0.24rem;
            line-height: 0.36rem;
            color: rgb(7, 17, 27);
            font-weight: 200;
            margin-right:0.24rem;
          }
          .atti_score{
            font-size: 0.20rem;
            line-height:0.36rem;
            color: rgb(255,153,0);
          }
          .star_style{
            margin-right: 0.24rem;
          }
          .deliveryTime{
            font-size: 0.24rem;
            line-height:0.36rem;
            color: rgb(147,153,159);
          }
        }
        .ratings_header_right_text1{
          margin:0
        }
      }

    }
    .ratings_title{
      .ratings_title_router{
        display: flex;
        margin:0.36rem 0 0.36rem 0.36rem;
        .ratings_title_router_link{
          padding:0.24rem;
          font-size: 0.24rem;
          margin-right:0.24rem;
          border-radius:0.04rem;
        }
        .all{
          background-color: #00A0DC;
            .ratings_title_router_link_text{
              color:#ffffff
            }
        }
        .satisfaction{
          background-color: #CCECF8;
        }
        .unsatisfactory{
          background-color: #E9EBEC;
        }
      }


      .check_ratings{
        margin:0.36rem;
        font-size: 0.24rem;
        color:rgba(147,153,159,0.5);
        .icon-click{
          color: rgb(0,160,220);
        }
      }
    }
    .split_line{
      width:100%;
      height:0.02rem;
      background-color:rgba(147,153,159,0.2)
    }


  }
  </style>

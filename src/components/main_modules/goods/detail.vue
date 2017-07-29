<template>
    <div class="detail" v-show="detailFlag" ref="detail">
      <div>
        <img :src="detailFood.image" alt="" @click="hideDetail">
        <div class="food_detail">
          <p v-text="detailFood.name" class="title"></p>
          <p><span>月销售{{detailFood.sellCount}}份</span>   <span>好评率{{detailFood.rating}}%</span></p>
          <div class="food_price">
            <p>¥<span class="price">{{detailFood.price}}</span>  <span v-show="detailFood.oldPrice" class="old_price">¥{{detailFood.oldPrice}}</span></p>
            <div class="cart">

                <div class="add_cart" v-if="!detailFood.foodCount" @click="addfood">加入购物车</div>
                <!--<div class="add_food" v-if="detailFood.foodCount">-->
                  <!--<i class="iconfont icon-jianhao icon-jiajianhao"  @click="cutfood(detailFood)"></i>-->
                  <!--<span   class="foods_count">{{detailFood.foodCount}}</span>-->
                  <!--<i class="iconfont icon-jiahao icon-jiajianhao" @click="addfood(detailFood)"></i>-->
                <!--</div>-->
              <add :detailFood="detailFood"  v-if="detailFood.foodCount"></add>
            </div>
          </div>
        </div>
        <split></split>
        <div class="info">
          <p>商品介绍</p>
          <p v-text="detailFood.info" class="info_text"></p>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Vue from 'vue'
  import "animate.css/animate.css"
  import BScroll from "better-scroll"
  import split from "../../util_comp/split.vue"
  import add from './add.vue'
    export default{
      props:["detailFood"],
      computed:{
        ...mapGetters(["goods","ratings","detailFlag"]),
//        food(){
//            let obj ={}
//          for(let i = 0;i<this.goods.length;i++){
//            this.goods[i].foods.forEach((v,i)=>{
//              if(v.name==this.detailFood.name){
//                obj =  v;
//              }
//            })
//          }
//         return obj
//        }
      },
      created(){
        this.$store.dispatch('getFoods');
        setTimeout(()=>{


        },20)
      },
      methods:{
//        addfood(val){
//            console.log(this.detailFood);
//          this.$store.dispatch("addFood",val)
//        },
//        cutfood(val){
//          this.$store.dispatch("cutFood",val)
//        },
        addfood(){
          if( !this.detailFood.foodCount ){
            Vue.set(this.detailFood , 'foodCount' ,1);
          }else{
            this.detailFood.foodCount ++;
          }
        },
        hideDetail(){
            this.$store.dispatch("showDetailFood")
        },
        _initscroll(){
            this.scroll = new BScroll(this.$ref.detail,{
                click:true
            })
        }
      },
      components:{
        split,
        add
      }
    }
</script>

<style scoped lang="less">
.detail{
  position: fixed;
  overflow: hidden;
  top: 0;
  bottom: 0;
  width:100%;
  background-color: rgb(255,255,255);
  div{
    overflow: hidden;
    img{
      width:100%;
      height:7.5rem;
    }
    .food_detail{
      margin:0.36rem;
      p{
        font-size: 0.20rem;
        color: rgb(147,153,159);
        font-weight:700;
        margin-bottom:0.32rem;
      }
      .title{
        font-size: 0.32rem;
        line-height:0.32rem;
        margin-bottom:0.16rem;
        color: rgb(7,17,27);
      }
      .food_price{
        display: flex;
        justify-content: space-between;

        P{
          font-size: 0.20rem;
          color: rgb(240,20,20);
          font-weight: normal;
        .price{
          font-size: 0.32rem;
          font-weight:700;
        }
        .old_price{
          color:rgb(7,17,27)
        }
        }
        .cart{
          .add_cart{
            width:1.48rem;
            font-size: 0.20rem;
            background-color:rgb(20,160,240);
            text-align: center;
            border-radius: 0.24rem;
            padding: 0.12rem 0.24rem;
            color: rgb(255,255,255);
          }

        }
      }
    }
    .info{
      margin:0.36rem;
      p{
        font-size: 0.28rem;
        line-height: 0.28rem;
        color: rgb(7,17,27);
        font-weight:200;
      }
      .info_text{
        margin:0.12rem 0.16rem 0;
        font-size: 0.24rem;
        line-height:0.48rem;
        color: rgb(77,85,93);
      }
    }
  }
}
</style>

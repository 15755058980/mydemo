<template>
  <div>
    <div class="foot">
      <div class="count" v-if="counts">{{counts}}</div>
      <div class="icon" :class="{'icon2':total}"  @click="showCart(total)">
        <i class="iconfont icon-gouwuche" :class="{'icon-gouwuche2':total}"></i>
      </div>
      <p><span>¥</span> <span>{{total+seller.deliveryPrice}}</span></p>
      <div class="hozline"></div>
      <div class="deliveryPrice" >另需配送费¥{{seller.deliveryPrice}}元</div>
      <div class="minPrice" v-show="seller.minPrice-total>0">
        <span >还差{{seller.minPrice-total}}元起送</span>
      </div>
      <div class="minPrice minPrice2"  v-show="seller.minPrice-total<=0">
        <span>去结算</span>
      </div>
    </div>
    <cart></cart>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import cart from "./goods/cart.vue"
  export default {
    computed: {
      ...mapGetters(['seller',"goods"]),
    total(){
        let count = 0;
        for(let i = 0;i<this.goods.length;i++){
          this.goods[i].foods.forEach((v,i)=>{
              if(v.foodCount){
                  count+=(v.foodCount*v.price)
              }
          })
        }
        return count
      },
      counts(){
        let count = 0;
        for(let i = 0;i<this.goods.length;i++){
          this.goods[i].foods.forEach((v,i)=>{
            if(v.foodCount){
              count+=v.foodCount
            }
          })
        }
        return count
      }
    },
    created(){

      setTimeout(()=>{

      },20)
    },
    components:{
     cart

    },
    methods:{
      showCart(total){

        this.$store.dispatch("showCart",total)
      }
    }

  }

</script>

<style scoped lang="less">
  .foot{
    line-height: 0.92rem;
    position: fixed;
    bottom: 0;
    width:100%;
    height:0.92rem;
    background-color: #141d27;
    display: flex;
    color: rgba(255,255,255,0.4);
    z-index: 99;
    .count{
      position: fixed;
      left:0.90rem;
      bottom:0.74rem;
      font-size: 0.18rem;
      background-color: rgb(240,20,20);
      color: rgb(255,255,255);
      z-index: 100;
      min-width:0.48rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      text-align: center;
    }
    .icon{
      position: fixed;
      left:0.36rem;
      bottom:0.04rem;
      width:0.80rem;
      border-radius: 50%;
      border: 0.12rem solid #141d27;
      background-color: #2B343C;
      text-align: center;
      line-height: 0.80rem;
      .icon-gouwuche{
        font-size: 0.48rem;
        line-height:0.48rem;
      }
    }
    .icon2{
      background-color: rgb(0,160,240);
      .icon-gouwuche2{
        color:rgb(255,255,255)
      }
    }
    p{
      margin-left:1.60rem;
    }
    .hozline{
      margin:0.24rem;
      border-left: 0.01rem solid rgba(255,255,255,0.2);
    }
    .deliveryPrice{
      box-sizing: border-box;
      font-size: 0.32rem;
      font-weight:200;
    }
    .minPrice{
      position: fixed;
      right:0;
      width:2.1rem;
      background-color:  #2B343C;
      text-align: center;
    }
    .minPrice2{
      background-color: rgb(0,160,240);
      color:white
    }

  }
</style>

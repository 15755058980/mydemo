<template>
  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="cart" v-if="cartFlag&&total">
      <div class="bgk" @click="hideCart"></div>
      <div class="food_list">
        <div class="title">
          <p>购物车</p>
          <p class="clear" @click="clear">清空</p>
        </div>
        <div ref="cart_scroll" class="aaa" >
          <div class="aaaa">
            <ul v-for="(v,k) in goods" >
              <li v-for="(val,key) in v.foods" v-if="val.foodCount">
                <div>
                  <p v-text="val.name"></p>
                  <div>
                    <span>¥<span class="price" v-text="val.foodCount*val.price"></span></span>
                    <!--<div class="add_food">-->
                      <!--<i class="iconfont icon-jianhao icon-jiajianhao" @click="cutfood(val)" v-if ="val.foodCount"></i>-->
                      <!--<span v-show="val.foodCount" v-text="val.foodCount" class="foods_count"></span>-->
                      <!--<i class="iconfont icon-jiahao icon-jiajianhao" @click.stop="addfood(val)"></i>-->
                    <!--</div>-->

                    <add :detailFood="val"></add>
                  </div>
                </div>
                <v-line></v-line>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from "vuex"
  import line from "../../util_comp/line.vue"
  import 'animate.css/animate.css'
  import BScroll from 'better-scroll'
  import add from './add.vue'
    export default{
      data(){
          return{
              isClick:false,
          }
      },
      computed:{
        ...mapGetters(["cartFlag","goods"]),
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

      },
      created(){
        this.$nextTick(()=>{

        })

        },
      methods:{
//        addfood(val){
//          this.$store.dispatch("addFood",val)
//        },
//        cutfood(val){
//            console.log(val)
//          this.$store.dispatch("cutFood",val)
//        },
        showCart(){

          this.$store.dispatch("showCart")
        },
        hideCart(){
          this.$store.dispatch("hideCart")
        },
        initcart(){
          if(!this.BScart){
            this.BScart = new BScroll(this.$refs.cart_scroll,{
              click:true
            });
          }else{
              this.BScart.refresh();
          }
        },
        clear(){
          this.$store.dispatch("clear")
        }
      },
      updated(){
        this.$nextTick(()=>{

            this.initcart()

        })
      },
      components:{
         "v-line": line,
        add
      }
    }
</script>

<style scoped lang="less">
.cart{
  z-index: 98;
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
  }
  .food_list{
    z-index:11;
    position: fixed;
    bottom: 0.92rem;
    left: 0;
    right:0;
    max-height:5.19rem;
    background-color: white;

    .title{
      width:100%;
      background-color:#f3f5f7;
      display: flex;
      justify-content: space-between;
      padding:0 0.36rem;
      height:0.80rem;
      box-sizing: border-box;
      line-height: 0.80rem;
      border-bottom:0.01rem solid rgba(7,17,27,0.2);
      p{
        font-size: 0.28rem;
        color: rgb(7,17,27);
        font-weight:200;
      }
      .clear{
        color: rgb(0,160,240);
        font-size: 0.24rem;
      }
    }

    ul{
      li{
        padding:0.24rem 0;
        div{
          display: flex;
          justify-content: space-between;
          line-height: 0.48rem;
          p{
            margin-left:0.36rem;
            font-size: 0.28rem;
            color: rgb(7,17,27);
          }
          div{
            margin-right:0.36rem;
            span{
              font-size: 0.20rem;
              color:rgb(240,20,20);
              font-weight:normal;
              line-height:0.48rem;
              .price{
                font-size: 0.28rem;
                font-weight:700;
              }
            }
            .add_food{
              margin-left:0.24rem;
              height:0.48rem;
              text-align: right;
              .icon-jiajianhao{
                color:rgb(0,160,240);
                line-height:0.48rem;
              }
              .foods_count{
                display: inline-block;
                width:0.48rem;
                text-align: center;
                line-height:0.48rem;
                font-size: 0.20rem;
                color: rgb(147,153,159);
              }
            }
          }
        }
      }
    }
  }
}
  .aaa{
    max-height: 4.38rem;
    overflow: hidden;

    .aaaa{

    }
  }
</style>

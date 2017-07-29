<template>
  <div class="goods">
    <div ref="goods_left" class="goods_left">
      <ul class="goods_menu">
        <li v-for="(v,k) in goods"  :key="k" :class="{'current':k===currentIndex}" @click.stop='selectMenu(k,$event)'>
          <p>
            <img src="../../../static/images/decrease.png" alt="" v-if="v.type==0" class="activity_img">
            <img src="../../../static/images/discount.png" alt="" v-if="v.type==1" class="activity_img">
            <img src="../../../static/images/special.png" alt="" v-if="v.type==2" class="activity_img">
            <img src="../../../static/images/invoice.png" alt="" v-if="v.type==3" class="activity_img">
            <img src="../../../static/images/guarantee.png" alt="" v-if="v.type==4" class="activity_img">
            <span v-text="v.name"></span>
          </p>
        </li>

      </ul>
    </div>
    <div ref="goods_right" class="goods_right">

      <div ref="right_list">
        <div  v-for="(v,k) in goods"  :key="k" class="food-list-hook">
          <div v-text="v.name" class="goods_right_name"></div>
          <div   v-for="(val,key) in v.foods" :key="key" >
            <div class="food">
              <img :src="val.icon" alt="" class="food_icon" @click="detail(val)">
              <div class="food_detail">
                <p v-text="val.name" class="food_name"></p>
                <p v-text="val.description"></p>
                <p> <span >月售{{val.sellCount}}份</span>    <span ></span>好评率{{val.rating}}%</p>
                <p> ¥<span class="price">{{val.price}}</span> <span v-show="val.oldPrice" class="oldprice">¥{{val.oldPrice}}</span></p>
                <!--<div class="add_food">-->
                    <!--<i class="iconfont icon-jianhao icon-jiajianhao"  @click="cutfood(val)" v-show="val.foodCount"></i>-->
                  <!--<span v-show="val.foodCount" v-text="val.foodCount" class="foods_count"></span>-->
                  <!--<i class="iconfont icon-jiahao icon-jiajianhao" @click="addfood(val)"></i>-->
                <!--</div>-->
                <add :detailFood="val"></add>

              </div>
            </div>
            <div class="food_line" v-show="key!=v.foods.length-1"></div>
          </div>
        </div>
      </div>
    </div>
    <detailFood :detailFood=food ></detailFood>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import "animate.css/animate.css"
  import detailFood from './goods/detail.vue'
  import add from './goods/add.vue'
export default{
  data(){
      return {
        listHeight:[],
        scrollY:0,
        food:{}
      }
  },
  computed: {
    ...mapGetters(['goods',"detailFlag"]),
    currentIndex(){
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (this.scrollY >= height1 && this.scrollY < height2) {
          return i;
        }
      }
      return 0;
    },
  },
  created(){
//    this.$store.dispatch("getFoods");
      this.$nextTick(()=>{
        setTimeout(()=>{
          this._initMenu();
          this._initList();
          this._calcHeight()
        },30)
      })
  },
  methods:{
    _initMenu(){
      this.menuBS=new BScroll(this.$refs.goods_left,{
          click: true
        });
    },
    _initList(){
      this.foodBS=new BScroll(this.$refs.goods_right,{
        click: true,
        probeType : 3,
      });
      this.foodBS.on('scroll',(pos) =>{
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    //点击联动
    selectMenu(k,e){

      let foodList = this.$refs.goods_right.getElementsByClassName('food-list-hook');
      let el = foodList[k];
      this.foodBS.scrollToElement(el,300);
    },
    //获取高度
    _calcHeight(){
      let foodList = this.$refs.goods_right.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for(let i = 0 ; i < foodList.length ; i++){
        height += foodList[i].clientHeight;
        this.listHeight.push(height);
      }
    },
    //加减
//    addfood(val){
//        this.$store.dispatch("addFood",val)
//    },
//    cutfood(val){
//      this.$store.dispatch("cutFood",val)
//    },
    detail(val){
        this.food=val;
        this.$store.dispatch("showDetailFood");
    }
  },
  components:{
    detailFood,
    add
  }
}
</script>

<style lang="less" scoped>
  .goods{
      position: fixed;
      top:3.48rem;
      bottom: 0.92rem;
      overflow: hidden;
      display: flex;
      color:black;
    .goods_left{
      background-color: #f3f5f7;
      flex:0 0 1.6rem;
      width:1.6rem;
      overflow: hidden;
      .goods_menu {
        li {
          &.current {
            background: rgb(255,255,255);
          }

          padding:0 0.24rem;
          display: table;
          height: 1.08rem;
          p{
            text-align: center;
            vertical-align: middle;
            display: table-cell;
            width: 1.12rem;
            .activity_img{
              display: inline;
              width: 0.24rem;
              height:0.24rem;
              line-height:0.28rem;
            }
          }
        }

      }
    }
    .goods_right{
      div{
        div{
          .goods_right_name{
            padding-left: 0.24rem;
            width:5.90rem;
            box-sizing: border-box;
            height: 0.52rem;
            background-color: #f3f5f7;
            font-size: 0.24rem;
            line-height:0.52rem;
            color: rgb(147,153,159);
            border-left:0.04rem solid #d9dde1;
          }
          .food{
            margin:0.36rem ;
            display: flex;
            .food_icon{
              width: 1.12rem;
              height:1.12rem;
            }
            .food_detail{
              width:3.86rem;
              padding:0.04rem 0.36rem 0 0.20rem;
              p{
                margin-top:0.16rem;
                font-size: 0.20rem;
                color: rgb(147,153,159);
                .price{
                  color:rgb(240,20,20);
                  font-weight:700;
                  font-size: 0.28rem;
                }
              }
              .food_name{
                margin:0;
                font-size: 0.28rem;
                color: rgb(7,17,27);
              }
              .add_food{
                height:0.48rem;
                text-align: right;
                .icon-jiajianhao{
                  color:rgb(0,160,240);
                  line-height:0.48rem;
                }
                .foods_count{
                  display: inline-block;
                  min-width:0.48rem;
                  text-align: center;
                  line-height:0.48rem;
                  font-size: 0.20rem;
                  color: rgb(147,153,159);
                }
              }
            }
          }
          .food_line{
            margin-left:0.36rem;
            width:5.18rem;
            height:0.02rem;
            background-color: rgba(147,153,159,0.3);
          }
        }
      }



    }



  }
</style>

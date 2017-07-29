<template>
  <div class="add_food">
    <i class="iconfont icon-jianhao icon-jiajianhao"  @click.stop="cutfood()" v-show="detailFood.foodCount"></i>
    <span v-show="detailFood.foodCount" v-text="detailFood.foodCount" class="foods_count"></span>
    <i class="iconfont icon-jiahao icon-jiajianhao" @click.stop="addfood()"></i>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Vue from 'vue';
    export default{
      props:["detailFood"],
      created(){
          setTimeout(()=>{

          },20)
      },
      methods:{
        addfood(){

          console.log(this);
          if( !this.detailFood.foodCount ){
            Vue.set(this.detailFood , 'foodCount' ,1);
          }else{
            this.detailFood.foodCount ++;
          }
//          this.$store.dispatch("addFood",val)
        },
        cutfood(e){

          if( this.detailFood.foodCount ){
            this.detailFood.foodCount --;
          }
//          this.$store.dispatch("cutFood",val)
        },
      }
    }
</script>

<style scoped lang="less">
  .add_food{
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
</style>

<template>
	<div class="header" :style="">
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <div class="header_body">
      <div class="header_left">
      <img :src="seller.avatar" alt="" class="avatar" @click="show">
      </div>
      <div class="headerCenter">
        <div class="header_text_top">
        <img src="../../../static/images/brand.png" alt="" class="brand">
        <span class="header_text_top_text">{{seller.name}}</span>
        </div>
        <div class="header_text_center">
          <span class="header_text_center_text">{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
        </div>
        <div class="header_text_bottom">
          <img src="../../../static/images/decrease.png" alt="" class="decrease">
          <div class="header_text_bottom_text">
          <span v-if="seller.supports">{{seller.supports[0].description}}</span>
          </div>
        </div>
      </div>
      <div class="header_right" @click="show">
          <span class="header_right_text" v-if="seller.supports">{{seller.supports.length}}个</span><span>></span>
      </div>

    </div>
    <div class="header_foot">
        <img src="../../../static/images/bulletin.png" alt="" class="bulletin">
        <span class="header_foot_text">{{seller.bulletin}}</span>
        <span class="header_foot_text_icon">></span>
      </div>
	  <show></show>
  </div>
</template>

<script>
	import {mapGetters} from 'vuex'
  import show from '../show/show.vue'
	export default {
		computed:{
			...mapGetters([
				'seller',"showFlag"
			])
		},
		created(){
			this.$store.dispatch('getSeller');
		},
    methods:{
		  show(){
        this.$store.dispatch("showDetail")
      }
    },
    components:{
		      show
    }
	}
</script>

<style lang='less' scoped>
	.header{
    width:100%;
    position: relative;
    background-color: rgba(7,17,27,0.5);
    display: flex;
		height: 2.68rem;
    .background{
      position: absolute;
      top:0;
      left:0;
      bottom: 0;
      right: 0;
      filter: blur(0.1rem);
      z-index:-999;
      img{
        width:100%;
        height:100%;
      }
    }

    .header_body{
      padding-top: 0.48rem;
      width:100%;
      height:2.12rem;
      display: flex;
      .header_left{
        .avatar{
          margin-left:0.48rem;
          width:1.28rem;
          height: 1.28rem;
          border-radius: 0.04rem;
        }
      }

      .headerCenter{

        padding-top:0.04rem;
        margin-left:0.32rem;
        .header_text_top{
          height:0.36rem;
          display: flex;
          .brand{
            height:0.36rem;
            width:0.60rem;
            margin-right:0.12rem;
          }
          .header_text_top_text{
            font-size: 0.32rem;
            color: rgb(255,255,255);
            font-weight: bold;
            line-height: 0.36rem;
          }
        }
        .header_text_center{
          height:0.24rem;
          margin-top:0.16rem;
          .header_text_center_text{
            font-size: 0.24rem;
            color:rgb(255,255,255);
            font-weight: 200;
            line-height:0.24rem;
          }
        }
        .header_text_bottom{
          display: flex;
          height:0.32rem;
          margin-top:0.16rem;
          .decrease{
            width:0.32rem;
            height:0.32rem;
            margin-right:0.08rem;
          }
          .header_text_bottom_text{
            font-size: 0.20rem;
            color:rgb(255,255,255);
            font-weight: 200;
            line-height:0.32rem;
          }
        }
      }
      .header_right{
        cursor: pointer;
        position: absolute;
        right:0.24rem;
        bottom:0.75rem;
        padding:0.14rem 0.16rem;
        border-radius:  0.28rem;
        background-color: rgba(0,0,0,0.1);
        color:rgb(255,255,255);
        font-size: 0.20rem;
        .header_right_text{
          margin-right:0.04rem;
          font-size: 0.20rem;
          color:rgb(255,255,255);
          line-height: 0.24rem;
          font-weight: 200;
        }
      }
    }
    .header_foot{
      display: flex;
      width:100%;
      position: absolute;
      bottom: 0;
      height:0.56rem;
      line-height: 0.56rem;
      background-color: rgba(7,17,27,0.2);
      font-size: 0.20rem;
      color:rgb(255,255,255);
      font-weight: 200;
      .bulletin{
        width:0.44rem;
        height:0.24rem;
        margin: 0.16rem 0.08rem 0.16rem 0.24rem;
      }
      .header_foot_text{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .header_foot_text_icon{
        margin-right:0.24rem;
        margin-left:0.08rem;
        cursor: pointer;
      }
    }
	}

</style>

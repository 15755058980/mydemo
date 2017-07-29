<template>
  <div class="all" ref="all">
    <div>
      <div class="ratings_container"  v-for="(v,k) in ratings" :key="k"   v-if="v.score>3&&v.text.length>=ratingsFlag">
        <div class="ratings_user">
          <div>
            <img :src="v.avatar" alt="" class="user_img">
          </div>
          <div>
            <div class="user_info">
              <div class="user_info_header">
                <p class="rating_username" v-text="v.username"></p>
                <p class="ratings_time" v-text="formatetime(v.rateTime)"></p>
              </div>
              <div class="star_info">
                <star :score="v.score" ref="star_show"></star>
                <p class="star_text"> <span v-text="seller.deliveryTime+(v.deliveryTime||0)"></span><span>分钟到达</span></p>
              </div>
            </div>
            <p v-text="v.text" class="ratings_text"></p>
            <div class="ratings_icon">
              <i class="icon iconfont icon-damuzhion" v-show="v.rateType===0"></i>
              <i class="icon iconfont icon-down" v-show="v.rateType===1"></i>
              <div class="icon_text" v-for="(val,k) in v.recommend" v-text="val" v-show="k<3"></div>
            </div>
          </div>
        </div>
        <v-line></v-line>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import line from '../../util_comp/line.vue'
  import star from '../../util_comp/star.vue'
  import Scroll from 'better-scroll'
  export default{
    computed:{
      ...mapGetters(["ratings","seller","ratingsFlag"])
    },
    created(){
      this.showStar();
      this.showScroll()
    },
    updated(){
      this.scroll&&this.scroll.refresh()
    },
    components:{
      "v-line":line,
      star
    },
    methods:{
      showStar(){
        setTimeout(()=>{
          this.$refs.star_show.forEach((v,i)=>{
            for(let i=0;i<v.$el.children.length;i++){
              v.$el.children[i].style.width=0.20+"rem";
              v.$el.children[i].style.height=0.20+"rem";
            }
          })
        },30)
      },
      showScroll(){
        setTimeout(()=>{
          this.scroll=new Scroll(this.$refs.all);
          console.log(scroll)
        },30)
      },
      formatetime(a){
        let datetime = new Date(a)
        function zero(x){
          return x>10?x:"0"+x
        }
        return datetime.getFullYear()+"-"+datetime.getMonth()+"-"+datetime.getDay()+" "+datetime.getHours()+":"+zero(datetime.getMinutes())+":"+zero(datetime.getSeconds());
      }
    }
  }
</script>

<style scoped lang="less">
  .all{
    position: fixed;
    top:8.5rem;
    bottom:0.92rem;
    left:0;
    right:0;
    overflow: hidden;
    div{
      .ratings_container{
        height: 100%;
        margin-top:0.36rem;
        overflow: hidden;
        .line{
          margin-top:0.36rem;
        }
        .ratings_user{
          margin-bottom:0.16rem;
          display: flex;
          margin-left:0.36rem;
          .user_img{
            width:0.56rem;
            height:0.56rem;
            border-radius: 0.28rem;
          }
          .user_info{
            margin-left:0.24rem;
            .user_info_header{
              width:6.98rem;
              display: flex;

              .rating_username{
                margin-top:0.04rem;
              }
              .ratings_time{
                position: absolute;
                right:0.36rem;
                color:rgb(147,153,159);
                font-size: 0.20rem;
                line-height: 0.24rem;
                font-weight:200;
              }
            }
            .star_info{
              display: flex;
              .star_show{
                margin-right:0.12rem;
              }
              .star_text{
                margin-left:0.12rem;
                font-size: 0.20rem;
                color:rgb(147,153,159);
              }
            }

          }
          .ratings_text{
            width:5.76rem;
            margin:0.12rem 0.24rem 0.16rem;
            font-size: 0.24rem;
            line-height:0.36rem;
            color: rgb(7,17,27);
          }
          .ratings_icon{
            display: flex;
            width:5.76rem;
            margin-left:0.24rem;
            .iconfont{
              font-size: 0.24rem;
              line-height:0.36rem;
            }
            .icon-damuzhion{
              color:rgb(0,160,220)
            }
            .icon-down{
              color: rgb(183,187,193);
            }
            .icon_text{
              padding:0 0.12rem;
              margin:0 0.16rem;
              border:0.01rem solid rgba(7,17,27,0.1);
              color: rgb(147,153,159);
              white-space: nowrap;
              font-size: 0.18rem;
              line-height:0.32rem;
              border-radius: 0.02rem;
            }
          }
        }

      }

    }

  }
</style>

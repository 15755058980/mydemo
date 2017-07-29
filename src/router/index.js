import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Goods from '../components/main_modules/goods.vue'
import Ratings from '../components/main_modules/ratings.vue'
import Seller from '../components/main_modules/seller.vue'
import All from '../components/main_modules/ratings/all.vue'
import Satisfaction from '../components/main_modules/ratings/satisfaction.vue'
import Unsatisfactory from '../components/main_modules/ratings/unsatisfactory.vue'
export default new Router({
  routes: [
    {
      path:'/goods',
      component:Goods
    }, {
      path:'/ratings',
      component:Ratings,
      children:[
        {
          path:"/ratings/all",
          component:All
        },
        {
          path:"/ratings/satisfaction",
          component:Satisfaction
        },
        {
          path:"/ratings/unsatisfactory",
          component:Unsatisfactory
        },
        {
          path:"/ratings",
          redirect:"/ratings/all"
        }
      ]
    },
    {
      path:'/seller',
      component:Seller
    },
    {
      path:"*",
      redirect:"/goods"
    }
  ]
})

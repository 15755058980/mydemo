import types from '../types.js'
import axios from 'axios'
import Vue from "vue"
const state = {
  goods: {},
  cartFlag:false,
  detailFlag:false,
};

const getters = {
  goods(state){
    return state.goods
  },
  foodsCount(state){
    return state.foodsCount
  },
  cartFlag(state){
    return state.cartFlag
  },
  detailFlag(state){
    return state.detailFlag
  }
};

const actions = {
  getFoods({commit, state}){
    axios.get('/api/goods').then(resp => {
      if (resp.data.errno === 0) {
        commit(types.GET_FOODS, resp.data.data)
      }
    })
  },
  addFood({commit,state},val){
  let o = state.goods.slice(0);
    o.forEach((v)=>{
      v.foods.forEach((value)=>{
        if(value==val){
          if(!value.foodCount){
           value.foodCount = 0
          }
          value.foodCount++;
        }
      })
    });
    commit(types.ADD_FOOD,o)
  },
  cutFood({commit,state},val){
    let o = state.goods.slice(0);
    o.forEach((v)=>{
      v.foods.forEach((value)=>{
        if(value==val){
          console.log("===================");
          if(value.foodCount<=0){
            value.foodCount=0
          }else {
            value.foodCount--;
          }
        }
      })
    });
    commit(types.CUT_FOOD,o)

  },
  showCart({commit},total){
    commit(types.SHOW_CART,total)
  },
  hideCart({commit}){
    commit(types.HIDE_CART)
  },
  clear({commit}){
    let o = state.goods.slice(0);
    o.forEach(v=>{
      v.foods.forEach(val=>{
        if(val.foodCount){
          val.foodCount=0
        }
      })
    })
    commit(types.CLEAR,o)
  },
  showDetailFood({commit}){
    commit(types.SHOW_DETAIL_FOOD)
  }
};

const mutations = {
  [types.GET_FOODS](state, data){
    state.goods = data
  },
  [types.ADD_FOOD](state,data){

  state.goods = data
  },
  [types.CUT_FOOD](state,data){
    state.goods = data
  },
  [types.SHOW_CART](state,data){
    if(data==0){
      state.cartFlag = false
    }else{
      state.cartFlag = !state.cartFlag
    }
  },
  [types.HIDE_CART](state){
    state.cartFlag = false;
  },
  [types.CLEAR](state,data){
    state.goods = data
    state.cartFlag = false
},
  [types.SHOW_DETAIL_FOOD](state){
    state.detailFlag=!state.detailFlag
  }
};
export default {
  state,
  getters,
  actions,
  mutations
}

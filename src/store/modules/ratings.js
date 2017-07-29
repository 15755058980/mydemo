import types from '../types.js'
import axios from 'axios'
const state = {
  ratings:[],
  ratingsFlag:0,
  count:0
};

const getters = {
  ratings(state){
    return state.ratings
  },
  ratingsFlag(state){
    return state.ratingsFlag
  },
  count(state){
    return state.count
  }
};

const actions = {
  getRatings({commit,state}){
    axios.get('/api/ratings').then( resp => {
      if( resp.data.errno === 0 ){
        commit(types.GET_RATINGS,resp.data.data)
      }
    })
  },
  showText({commit}){
    commit(types.GET_TEXT)
  }
};

const mutations = {
  [types.GET_RATINGS](state,data){
    state.ratings=data
  },
  [types.GET_TEXT](state){
    state.count++;
    if(state.count%2!=1){
      return  state.ratingsFlag = 0;
    }
    return state.ratingsFlag = 1

  }
};
export default {
	state,
	getters,
	actions,
	mutations
}

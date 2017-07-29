import types from '../types.js'
import axios from 'axios'

const state = {
	seller:{},
  showFlag:false,
  collectFlag:true
};
const getters = {
	seller(state){
		return state.seller;
	},
  showFlag(state){
	  return state.showFlag
  },
  collectFlag(state){
    return state.collectFlag
  }
};

const actions = {

	getSeller({commit,state}){
		axios.get('/api/seller').then( resp => {
			if( resp.data.errno === 0 ){
				commit(types.GET_SELLER,resp.data.data)
			}
		})
	},
  showDetail({commit}){
	  commit(types.SHOW_DETAIL)
  },
  hideDetail({commit}){
	  commit(types.HIDE_DETAIL)
  },
  showCollectFlag({commit}){
	  commit(types.SHOW_COLLECT_FLAG)
  }
};

const mutations = {
	[types.GET_SELLER](state,data){
		state.seller = data;
	},
  [types.SHOW_DETAIL](state){
	  state.showFlag = true;
  },
  [types.HIDE_DETAIL](state){
    state.showFlag = false;

  },
  [types.SHOW_COLLECT_FLAG](state){
    state.collectFlag = !state.collectFlag;
  }
};
export default {
	state,
	getters,
	actions,
	mutations
}

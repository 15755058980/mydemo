import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import seller from './modules/seller'
import goods from './modules/goods'
import ratings from './modules/ratings'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  actions,

  plugins: [createLogger()],
  modules: {
    seller,
    goods,
    ratings
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import todo from './modules/todo'
import publish from './modules/publish'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    todo,
    publish
  }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'

import City111 from './City'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { /*用来引入子状态*/
        city:City111  /*city是属性、键，只有当键和值一样时才可以简写为一个*/
    }
})

import Vue from 'vue'
import App from './App.vue'
// import router from './routers/index.js' /*index.js可以省略，如下*/
import router from './routers'
import store from './stores'

import axios from 'axios'
Vue.prototype.axios = axios

Vue.filter('setWH', (url, arg) => {
    return url.replace(/w\.h/, arg);  /*正则匹配*/
});

import Scroller from '@/components/Scroller'
Vue.component('Scroller', Scroller);  /*全局注册*/

import Loading from '@/components/Loading'
Vue.component('Loading', Loading);  /*全局注册*/

Vue.config.productionTip = false

new Vue({
    router,
    store,
    // Scroller,
    render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'

import './assets/styles/index.css'
import './icons'

import './mixins/errors'
import './mixins/urlbuilder'
import router from './router'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')

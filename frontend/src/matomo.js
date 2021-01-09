import Vue from 'vue'
import VueMatomo from 'vue-matomo'

import router from './router'

if (process.env.VUE_APP_MATOMO_URL && process.env.VUE_APP_MATOMO_URL.length > 0) {
    Vue.use(VueMatomo, {
        host: process.env.VUE_APP_MATOMO_URL,
        siteId: process.env.VUE_APP_MATOMO_SITE_ID,
        router: router,
        disableCookies: true,
        enableHeartBeatTimer: true,
        heartBeatTimerInterval: 5
    })
}

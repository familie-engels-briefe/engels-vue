import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import './sentry'

import './assets/styles/index.css'
import './icons'

import './mixins/errors'
import './mixins/urlbuilder'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router: router,
    store: store,
    mounted () {
        const that = this

        axios.all([
            axios.get(this.createApiUrl('organisations')),
            axios.get(this.createApiUrl('persons')),
            axios.get(this.createApiUrl('places')),
            axios.get(this.createApiUrl('letters'))
        ])
            .then(function (responses) {
                that.$store.commit('setOrganisations', responses[0].data.data.org)
                that.$store.commit('setPersons', responses[1].data.data.person)
                that.$store.commit('setPlaces', responses[2].data.data.place)
                that.$store.commit('setLetters', responses[3].data.data.letter)
            })
            .catch(function (err) {
                that.displayAxiosError(err)
            })
            .then(function () {
                that.$store.commit('setLoaded')
            })
    }
}).$mount('#app')

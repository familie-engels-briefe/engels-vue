import Vue from 'vue'

Vue.mixin({
    methods: {
        createUrl: function (path) {
            return process.env.VUE_APP_BACKEND_BASE_URL + '/' + path
        }
    }
})

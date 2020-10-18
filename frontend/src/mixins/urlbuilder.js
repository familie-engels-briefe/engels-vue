import Vue from 'vue'

Vue.mixin({
    methods: {
        createApiUrl: function (path) {
            return process.env.VUE_APP_API_BASE_URL + '/api/v1/' + path
        },
        createWordpressUrl: function (path) {
            return process.env.VUE_APP_WORDPRESS_BASE_URL + '/' + path
        },
        createFacsimileUrl: function (fac) {
            return process.env.VUE_APP_API_BASE_URL + '/facsimile/' + fac
        }
    }
})

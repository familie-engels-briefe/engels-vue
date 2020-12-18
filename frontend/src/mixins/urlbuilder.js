import Vue from 'vue'

/**
 * Remove the slash slash in a url.
 *
 * @param {string} url
 * @returns {string}
 */
function removeLastSlash(url) {
    if (!url) {
        return url
    }

    if (url.slice(-1) === '/') {
        return url.slice(0, url.length - 1)
    } else {
        return url
    }
}

const API_BASE_URL = removeLastSlash(process.env.VUE_APP_API_BASE_URL)
const WORDPRESS_BASE_URL = removeLastSlash(process.env.VUE_APP_WORDPRESS_BASE_URL)

Vue.mixin({
    methods: {
        createApiUrl: function (path) {
            return API_BASE_URL + '/api/v1/' + path
        },
        createWordpressUrl: function (path, query) {
            let url = WORDPRESS_BASE_URL + '/' + path
            if (typeof query !== 'undefined') {
                url += '?' + new URLSearchParams(query)
            }

            return url
        },
        createFacsimileUrl: function (fac) {
            return API_BASE_URL + '/facsimile/' + fac
        }
    }
})

import Vue from 'vue'

Vue.mixin({
    methods: {
        displayAxiosError: function (err) {
            console.error(err)
        }
    }
})

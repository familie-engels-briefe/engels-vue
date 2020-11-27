import Vue from 'vue'

import * as Sentry from "@sentry/browser"

Vue.mixin({
    methods: {
        displayAxiosError: function (err) {
            Sentry.captureException(err)

            this.$store.commit('setError', {
                message: 'Einige Daten konnte nicht geladen werden! Probiere es bitte später noch einmal oder <a href="mailto:' + process.env.VUE_APP_ADMIN_EMAIL + '?subject=Fehler%20Engels%20Edition">schreibe uns</a> eine E-Mail.'
            })
        }
    }
})

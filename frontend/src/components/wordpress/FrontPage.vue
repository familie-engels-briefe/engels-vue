<template>
    <Loading :loading="loading">
        <WordpressPage :html="html"></WordpressPage>
    </Loading>
</template>

<script>
import axios from 'axios'

import Loading from './../Loading'
import WordpressPage from './Page'

export default {
    name: 'WordpressFrontPage',
    components: {
        Loading,
        WordpressPage,
    },
    data () {
        return {
            id: null,
            html: null,
            loading: true
        }
    },
    created () {
        let that = this

        axios.get(this.createWordpressUrl('/wp-json/engels/v1/frontpage'))
            .then(function (data) {
                that.id = data.data.ID
                that.html = data.data.content.raw
            })
            .catch(function (err) {
                that.displayAxiosError(err)
            })
            .then(function () {
                that.loading = false
            })
    },
    mounted () {
        console.debug('Mounted Wordpress/FrontPage')
    }
}
</script>

<style scoped>

</style>

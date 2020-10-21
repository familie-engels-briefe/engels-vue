<template>
    <Loading :loading="loading">
        <BasePage :html="html"></BasePage>
    </Loading>
</template>

<script>
import axios from 'axios'

import Loading from './../Loading'
import BasePage from './BasePage'

export default {
    name: 'WordpressFrontPage',
    components: {
        Loading,
        BasePage,
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

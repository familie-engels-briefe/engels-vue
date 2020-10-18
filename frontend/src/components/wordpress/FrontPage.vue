<template>
    <WordpressPage :html="html"></WordpressPage>
</template>

<script>
import axios from 'axios'

import WordpressPage from './Page'

export default {
    name: 'WordpressFrontPage',
    components: {
        WordpressPage,
    },
    data () {
        return {
            id: null,
            html: null
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
    },
    mounted () {
        console.debug('Mounted Wordpress/FrontPage')
    }
}
</script>

<style scoped>

</style>

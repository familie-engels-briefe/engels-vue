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
    name: 'WordpressPage',
    components: {
        Loading,
        BasePage,
    },
    data () {
        return {
            id: null,
            html: null,
            title: null,
            loading: true
        }
    },
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    created () {
        this.load()
    },
    mounted () {
        console.debug('Mounted Wordpress/Page')
    },
    methods: {
        load () {
            this.loading = true

            let that = this

            axios.get(this.createWordpressUrl('/wp-json/wp/v2/pages', {
                slug: this.slug
            }))
                .then(function (data) {
                    if (data.data && data.data.length > 0) {
                        that.id = data.data[0].id
                        that.html = data.data[0].content.rendered
                        that.title = data.data[0].title.rendered

                        document.title = that.title
                    } else {
                        that.html = '<p class="font-bold">Die Seite gibt es leider nicht.</p>'
                    }
                })
                .catch(function (err) {
                    that.displayAxiosError(err)
                })
                .then(function () {
                    that.loading = false
                })
        }
    },
    watch: {
        slug () {
            this.load()
        }
    }
}
</script>

<style scoped>

</style>

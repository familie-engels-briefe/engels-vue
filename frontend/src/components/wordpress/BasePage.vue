<template>
    <div v-html="html" class="page wordpress"></div>
</template>

<script>
export default {
    name: 'WordpressBasePage',
    props: {
        html: {
            type: String,
            required: false
        }
    },
    mounted () {
        console.debug('Mounted Wordpress/Page')
    }
}
</script>

<style scoped>

</style>

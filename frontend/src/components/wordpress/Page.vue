<template>
    <div v-html="html" class="page wordpress"></div>
</template>

<script>
export default {
    name: 'WordpressPage',
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

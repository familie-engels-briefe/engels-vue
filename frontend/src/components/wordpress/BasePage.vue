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
/deep/ h1 {
    @apply text-gold text-6xl font-bold leading-tight font-serif mb-8;
}

/deep/ img {
    @apply block w-full;
}

/deep/ a {
    @apply underline;
}

/deep/ .wp-block-columns {
    @apply flex flex-row flex-wrap -mx-8;
}

/deep/ .wp-block-columns .wp-block-column {
    @apply w-full px-8 mb-4;
}

@media (min-width: 1024px) {
    /deep/ .wp-block-columns .wp-block-column {
        @apply w-auto flex-1 mb-0;
    }
}
</style>

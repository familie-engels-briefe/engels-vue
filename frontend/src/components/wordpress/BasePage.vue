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

/deep/ h2 {
    @apply text-4xl font-bold mb-0;
}

/deep/ h3 {
    @apply text-2xl font-bold mb-0;
}

/deep/ h4 {
    @apply text-xl font-bold mb-0;
}

/deep/ h5 {
    @apply text-lg font-bold mb-0;
}

/deep/ h6 {
    @apply font-bold mb-0;
}

/deep/ img {
    @apply block;
}

/deep/ .size-medium {
    @apply max-w-xs;
}

/deep/ figure figcaption {
    @apply text-gray-dark px-4 py-2;
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

/deep/ .alignleft {
    @apply float-left;
}

/deep/ .aligncenter > * {
    @apply text-center;
}

/deep/ .alignright {
    @apply float-right;
}
</style>

<template>
    <pre class="overflow-x-auto bg-gray-lighter p-4"><code v-text="xml"></code></pre>
</template>

<script>
export default {
    name: 'LetterXml',
    props: {
        xml: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>

</style>

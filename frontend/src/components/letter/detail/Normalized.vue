<template>
    <div>
        <div v-html="html"></div>
    </div>
</template>

<script>
export default {
    name: 'LetterNormalized',
    props: {
        html: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>

</style>

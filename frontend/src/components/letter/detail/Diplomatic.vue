<template>
    <div>
        <div v-html="html"></div>
    </div>
</template>

<script>
export default {
    name: 'LetterDiplomatic',
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

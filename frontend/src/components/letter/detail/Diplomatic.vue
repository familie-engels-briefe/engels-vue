<template>
    <div>
        <div v-html="html" class="letter letter-diplomatic"></div>
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
.letter-diplomatic {
    @apply font-letter-serif;
}

/deep/ [rendition="#g.rend.script.latin"] {
    @apply font-letter-sans;
}
</style>

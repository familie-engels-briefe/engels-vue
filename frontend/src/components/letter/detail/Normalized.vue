<template>
    <div>
        <div v-html="html" class="letter letter-normalized"></div>
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
.letter-normalized {
    @apply font-letter-serif;
}

/deep/ [rendition="#g.rend.script.latin"] {
    @apply font-letter-sans;
}
</style>

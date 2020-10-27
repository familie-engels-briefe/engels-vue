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

/deep/ [data-rendition="#g.rend.script.latin"] {
    @apply font-letter-sans;
}

/deep/ [data-rend="underline"] {
    @apply underline;
}

/deep/ .tei_expan[data-n="com"]::before {
    content: ' [';
}

/deep/ .tei_expan[data-n="com"]::after {
    content: ']';
}

/deep/ .tei_choice .tei_orig {
    @apply hidden;
}

/deep/ .tei_choice .tei_orig:only-child {
    @apply inline;
}

/deep/ .tei_choice .tei_abbr {
    @apply hidden;
}

/deep/ .tei_choice .tei_abbr:only-child {
    @apply inline;
}

/deep/ .tei_choice[data-rendition="#g.enc.tagsdecl.suspension.type1"] .tei_abbr {
    @apply hidden;
}

/deep/ .tei_choice[data-rendition="#g.enc.tagsdecl.suspension.type2"] .tei_abbr {
    @apply hidden;
}

/deep/ .tei_choice[data-rendition="#g.enc.tagsdecl.suspension.type3"] .tei_abbr {
    @apply inline;
}
/deep/ .tei_choice[data-rendition="#g.enc.tagsdecl.suspension.type3"] .tei_expan {
    @apply hidden;
}

/deep/ [data-rend="sup"] {
    vertical-align: super;
}

/deep/ .tei_unclear {
    @apply text-gray;
}

/deep/ .tei_supplied::before {
    content: '[';
}
/deep/ .tei_supplied::after {
    content: ']';
}

/deep/ .tei_gap {
    @apply italic;
}
</style>

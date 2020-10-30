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
    },
    mounted () {
        console.debug('Mounted Letter/Detail/Normalized')
    }
}
</script>

<style scoped>
/**
 * Simple formatting
 */
.letter-normalized {
    @apply font-letter-serif;
}

/deep/ [data-rendition="#g.rend.script.latin"] {
    @apply font-letter-sans;
}

/deep/ [data-rend*="underline"] {
    @apply underline;
}

/deep/ [data-rend*="sup"] {
    vertical-align: super;
}

/deep/ [data-rend*="sub"] {
    vertical-align: sub;
}

/**
 * <choice></choice>
 */

/deep/ .tei_expan .tei_ex::before {
    content: '[';
}
/deep/ .tei_expan .tei_ex::after {
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

/deep/ .tei_choice .tei_abbr:only-child,
/deep/ .tei_abbr[data-type="currency"] {
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

/**
 * Missing / added content
 */

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

/deep/ .tei_del {
    @apply hidden;
}

/**
 * Tables
 */

/deep/ table tr {
    @apply border-0;
}

/deep/ table tr:hover {
    @apply bg-transparent;
}

/deep/ table tr td {
    @apply border border-dashed border-black;
}
</style>

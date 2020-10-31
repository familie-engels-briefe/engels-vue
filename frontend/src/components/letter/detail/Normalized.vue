<template>
    <div>
        <component :is="processedHtml" class="letter letter-normalized"></component>
    </div>
</template>

<script>
import Person from './Person'

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
    },
    computed: {
        processedHtml () {
            const wrapper = document.createElement('div')
            wrapper.innerHTML = this.html

            // Replace persons with correcesponding components
            Array.from(wrapper.querySelectorAll('.tei_persName')).forEach(function (person) {
                const personNode = document.createElement('component')
                personNode.setAttribute('is', 'Person')
                personNode.setAttribute('id', person.getAttribute('data-ref'))
                personNode.innerHTML = person.innerHTML

                person.replaceWith(personNode)
            })

            return {
                template: wrapper.outerHTML,
                components: {
                    Person
                },
                data () {
                    return {
                        Person
                    }
                }
            }
        }
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

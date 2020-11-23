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
            const that = this
            const wrapper = document.createElement('div')
            wrapper.innerHTML = this.html

            // Replace persons with correcesponding components
            Array.from(wrapper.querySelectorAll('.tei_persName')).forEach(function (person) {
                const personNode = document.createElement('component')
                personNode.setAttribute('is', 'Person')
                personNode.setAttribute(':person', JSON.stringify(that.$store.getters.getPersonByRef(person.getAttribute('data-ref')) || {}))
                personNode.innerHTML = person.innerHTML

                person.replaceWith(personNode)
            })

            Array.from(wrapper.querySelectorAll('.tei_rs[data-type="person"]')).forEach(function (person) {
                const personNode = document.createElement('component')
                personNode.setAttribute('is', 'Person')
                personNode.setAttribute(':person', JSON.stringify(that.$store.getters.getPersonByRef(person.getAttribute('data-ref')) || {}))
                personNode.innerHTML = person.innerHTML

                person.replaceWith(personNode)
            })

            // Show abbreviations when the expen part is "no" or "com"
            Array.from(wrapper.querySelectorAll('.tei_choice .tei_expan[data-n="no"],.tei_choice .tei_expan[data-n="com"]')).forEach(function (expan) {
                if (expan.closest('.tei_choice') && expan.closest('.tei_choice').querySelector('.tei_abbr')) {
                    expan.closest('.tei_choice').querySelector('.tei_abbr').setAttribute('data-show', 'true')
                }
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

/deep/ .tooltip-button {
    @apply border-b border-dashed border-gray;
}

/**
 * <choice></choice>
 */

/deep/ .tei_choice .tei_expan[data-n="com"]::before {
    content: ' [';
}
/deep/ .tei_choice .tei_expan[data-n="com"]::after {
    content: '] ';
}

/deep/ .tei_choice .tei_expan[data-n="no"] {
    @apply hidden;
}

/deep/ .tei_choice .tei_orig {
    @apply hidden;
}

/deep/ .tei_choice .tei_abbr {
    @apply hidden;
}

/deep/ .tei_choice .tei_abbr[data-show="true"] {
    @apply inline;
}

/deep/ .tei_choice .tei_abbr[data-rendition="#g.enc.tagsdecl.suspension.type3"] {
    @apply inline;
}

/**
 * Missing / added content
 */

/deep/ .tei_g[data-ref="#g.enc.chardecl.lparen.type1"] > *,
/deep/ .tei_g[data-ref="#g.enc.chardecl.rparen.type1"] > * {
    @apply hidden;
}
/deep/ .tei_g[data-ref="#g.enc.chardecl.lparen.type1"]:after {
    @apply inline;

    content: '(';
}
/deep/ .tei_g[data-ref="#g.enc.chardecl.rparen.type1"]:after {
    @apply inline;

    content: ')';
}

/deep/ .tei_unclear {
    @apply text-gray;
}

/deep/ .tei_supplied[data-reason="siegelausriss"]::before {
    content: '[';
}
/deep/ .tei_supplied[data-reason="siegelausriss"]::after {
    content: ']';
}

/deep/ .tei_gap {
    @apply italic;
}

/deep/ .tei_del {
    @apply hidden;
}

/deep/ .tei_lb:after {
    content: ' ';
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

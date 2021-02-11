<template>
    <div class="flex flex-wrap lg:-mx-6 pb-24">
        <div class="w-full mb-6 lg:w-1/2 lg:px-6 lg:mb-0">
            <LetterFacsimile v-if="facsimiles"
                             :facsimiles="facsimiles"
                             :index="facsimileIndex"></LetterFacsimile>
        </div>

        <div class="w-full lg:w-1/2 lg:px-6">
            <component :is="processedHtml"
                       class="letter letter-normalized"></component>
        </div>
    </div>
</template>

<script>
import PersonTooltip from './tooltip/PersonTooltip'
import PlaceTooltip from './tooltip/PlaceTooltip'
import OrganisationTooltip from './tooltip/OrganisationTooltip'
import LetterTooltip from './tooltip/LetterTooltip'
import FacsimileLink from './FacsimileLink'
import LetterFacsimile from './Facsimile'

import { replacePersons, replacePlaces, replaceOrganisations, replaceLetters } from './helper_tooltips'
import { highlightTopics } from './helper_highlights'
import { replaceFacsimiles } from './helper_facsimiles'

export default {
    name: 'LetterNormalized',
    components: {
        LetterFacsimile,
    },
    props: {
        html: {
            type: String,
            required: true
        },
        facsimiles: {
            required: false,
        },
        highlights: {
            type: Object,
            required: false,
            default () {
                return {}
            },
        },
    },
    data () {
        return {
            facsimileIndex: 0
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

            replacePersons(wrapper, this.$store)
            replacePlaces(wrapper, this.$store)
            replaceOrganisations(wrapper, this.$store)
            replaceLetters(wrapper, this.$store)
            replaceFacsimiles(wrapper)

            highlightTopics(wrapper, this.highlights && this.highlights.topics ? this.highlights.topics : [])

            // Show abbreviations when the expen part is "no" or "com"
            Array.from(wrapper.querySelectorAll('.tei_choice .tei_expan[data-n="no"],.tei_choice .tei_expan[data-n="com"]')).forEach(function (expan) {
                if (expan.closest('.tei_choice') && expan.closest('.tei_choice').querySelector('.tei_abbr')) {
                    expan.closest('.tei_choice').querySelector('.tei_abbr').setAttribute('data-show', 'true')
                }
            })

            return {
                template: wrapper.outerHTML,
                components: {
                    PersonTooltip,
                    PlaceTooltip,
                    OrganisationTooltip,
                    LetterTooltip,
                    FacsimileLink,
                },
                data () {
                    return {
                        PersonTooltip,
                        PlaceTooltip,
                        OrganisationTooltip,
                        LetterTooltip,
                        FacsimileLink,
                    }
                },
                methods: {
                    changeFacsimile (filename) {
                        for (let i = 0; i < that.facsimiles.length; i++) {
                            if (that.facsimiles[i].url === filename) {
                                that.facsimileIndex = i
                                break
                            }
                        }
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
    @apply block;

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

/**
 * Signature
 */
/deep/ .tei_signed {
    @apply block text-right;
}

/**
 * Indention
 */
/deep/ .tei_p,
/deep/ .tei_openen,
/deep/ .tei_closer {
    text-indent: 2rem;
}
</style>

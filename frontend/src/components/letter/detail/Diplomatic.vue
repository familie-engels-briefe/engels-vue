<template>
    <div class="flex flex-wrap lg:-mx-6 pb-24">
        <div class="w-full mb-6 lg:w-1/2 lg:px-6 lg:mb-0">
            <LetterFacsimile v-if="facsimiles" :facsimiles="facsimiles" :index="facsimileIndex"></LetterFacsimile>
        </div>

        <div class="w-full lg:w-1/2 lg:px-6">
            <div :is="processedHtml" class="letter letter-diplomatic"></div>
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
    name: 'LetterDiplomatic',
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
        console.debug('Mounted Letter/Detail/Diplomatic')
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

            // Replace uncertain text with element with highest certainty
            Array.from(wrapper.querySelectorAll('.tei_choice')).forEach(function (choice) {
                const unclears = Array.from(choice.querySelectorAll('.tei_unclear'))

                if (unclears.length <= 0) {
                    return
                }

                // Hide all choices by default
                choice.querySelectorAll('.tei_unclear').forEach(function (unclear) {
                    unclear.classList.add('hidden')
                })

                // Show in order if they exist
                if (choice.querySelectorAll('.tei_unclear[data-cert="high"]').length > 0) {
                    choice.querySelector('.tei_unclear[data-cert="high"]').classList.remove('hidden')
                    return
                }

                if (choice.querySelectorAll('.tei_unclear[data-cert="medium"]').length > 0) {
                    choice.querySelector('.tei_unclear[data-cert="medium"]').classList.remove('hidden')
                    return
                }

                choice.querySelector('.tei_unclear').classList.remove('hidden')
            })

            // Replace damaged text with placeholder
            Array.from(wrapper.querySelectorAll('.tei_damage .tei_supplied[data-reason="siegelausriss"]')).forEach(function (damage) {
                damage.innerHTML = 'Textverlust'
            })

            // Replace spacing with css values
            Array.from(wrapper.querySelectorAll('.tei_space')).forEach(function (space) {
                const dim = space.getAttribute('data-dim')
                const unit = space.getAttribute('data-unit')
                let quantity = parseInt(space.getAttribute('data-quantity'))
                let calc = null
                let style = ''

                if (space.getAttribute('data-rend') === 'unclear') {
                    return
                }

                if (dim === 'horizontal') {
                    style += 'width'
                } else if (dim === 'vertical') {
                    style += 'height'
                } else {
                    console.error('Unknown space dim: ', dim)
                    return
                }

                if (isNaN(quantity)) {
                    console.warn('Could not parse space quantity, assuming 1: ', quantity)
                    quantity = 1
                } else if (quantity < 0) {
                    console.error('Space quantity is negative: ', quantity)
                    return
                }

                if (unit === 'word' || unit === 'words') {
                    calc = quantity * 2
                } else if (unit === 'char' || unit === 'chars') {
                    calc = quantity * 0.5
                } else if (unit === 'line' || unit === 'lines') {
                    calc = quantity
                } else {
                    console.error('Unknown space unit: ', unit)
                    return
                }

                space.style[style] = calc + 'rem'
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
.letter-diplomatic {
    @apply font-letter-serif;
}

/deep/ p + p {
    @apply mt-0;
}

/deep/ [data-rendition="#g.rend.script.latin"] {
    @apply font-letter-sans;
}

/deep/ [data-rend="strikethrough"] {
    @apply line-through;
}

/deep/ .tei_hi[data-rend*="underline"],
/deep/ .engels_hiSic .engels_hiIntended[data-rend*="underline"] {
    @apply underline;
}

/deep/ .tei_hi[data-rend="spacing"] {
    @apply tracking-widest;
}

/deep/ [data-rend*="sup"] {
    vertical-align: super;
}

/deep/ [data-rend*="sub"] {
    vertical-align: sub;
}

/deep/ [data-rendition="#g.enc.tagsdecl.indent-small"] {
    text-indent: 1rem;
}
/deep/ [data-rendition="#g.enc.tagsdecl.indent-medium"] {
    text-indent: 2rem;
}
/deep/ [data-rendition="#g.enc.tagsdecl.indent-large"] {
    text-indent: 3rem;
}

/deep/ .tei_pb {
    @apply block w-full border-t border-gray my-4;
}

/deep/ hr {
    @apply border-gray;
}

/deep/ .tooltip-button {
    @apply border-b border-dashed border-gray;
}

/**
 * Choice
 */
/deep/ .tei_choice .tei_corr {
    @apply hidden;
}

/deep/ .tei_choice .tei_expan {
    @apply hidden;
}

/deep/ .tei_choice .ed {
    @apply hidden;
}

/**
 * Missing / added content
 */

/deep/ .tei_unclear {
    @apply text-gray;
}

/deep/ .tei_subst .ed {
    @apply italic;
}

/deep/ .tei_add:not([data-place]) {
    @apply font-bold;
}
/deep/ .tei_add[data-place="above"] {
    @apply relative;

    top: -.5rem;
}
/deep/ .tei_add[data-place="below"] {
    @apply relative;

    bottom: -.5rem;
}

/deep/ .tei_damage .tei_supplied[data-reason="damage"]:before {
    content: '{';
}
/deep/ .tei_damage .tei_supplied[data-reason="damage"]:after {
    content: '}';
}

/deep/ .tei_subst .tei_del[data-rend="overwritten"] {
    font-size: .75rem;
}
/deep/ .tei_subst .tei_add {
    @apply font-bold;
}

/deep/ .tei_metamark[data-function="insertion"][data-place="above"] {
    @apply relative;

    top: -.5rem;
}

/**
 * Spacing
 */
/deep/ .tei_space {
    @apply inline-block;
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
 * Envelope
 */
/deep/ [data-page="envelope wrapper"] {
    @apply flex flex-col -my-2;
}

/deep/ [data-page="envelope top"],
/deep/ [data-page="envelope middle"],
/deep/ [data-page="envelope bottom"] {
    @apply flex flex-row w-full -mx-2;
}

/deep/ [data-page="envelope wrapper"] [data-page^="envelope"] [data-page^="env"] {
    @apply w-1/3 p-2;

    min-height: 4rem;
}
</style>

<template>
    <div class="flex flex-wrap lg:-mx-6 pb-48 lg:pb-24">
        <div class="w-full mb-6 lg:w-1/2 lg:px-6 lg:mb-0">
            <LetterFacsimile v-if="facsimiles"
                             :facsimiles="facsimiles"
                             :index="facsimileIndex"></LetterFacsimile>
        </div>

        <div class="w-full lg:w-1/2 lg:px-6">
            <div>
                <component :is="processedHtml" class="letter letter-normalized"></component>
            </div>

            <div class="mt-16">
                <h3 class="font-light">Textträgerbeschreibung</h3>

                <table class="w-full table-source">
                    <tbody>
                        <tr class="font-bold">
                            <td colspan="2">
                                Identifizierung
                            </td>
                        </tr>
                        <tr>
                            <td>Ort</td>
                            <td v-text="identifierSettlement"></td>
                        </tr>
                        <tr>
                            <td>Sammlung</td>
                            <td v-text="identifierRepository"></td>
                        </tr>
                        <tr>
                            <td>IDNO</td>
                            <td v-text="identifierIdno"></td>
                        </tr>
                        <tr class="font-bold">
                            <td colspan="2">
                                Handschriftlich
                            </td>
                        </tr>
                        <tr v-for="physHandNote in physHandNotes" :key="physHandNote.id">
                            <td v-text="physHandNote.author"></td>
                            <td v-text="physHandNote.text"></td>
                        </tr>
                        <tr class="font-bold">
                            <td colspan="2">
                                Type
                            </td>
                        </tr>
                        <tr v-for="physTypeNote in physTypeNotes" :key="physTypeNote.id">
                            <td v-text="physTypeNote.author"></td>
                            <td v-text="physTypeNote.text"></td>
                        </tr>
                        <tr class="font-bold">
                            <td colspan="2">
                                Script
                            </td>
                        </tr>
                        <tr v-for="physScriptNote in physScriptNotes" :key="physScriptNote.id">
                            <td v-text="physScriptNote.author"></td>
                            <td v-text="physScriptNote.text"></td>
                        </tr>
                        <tr class="font-bold">
                            <td colspan="2">
                                Materialität Substrat
                            </td>
                        </tr>
                        <tr>
                            <td>Material</td>
                            <td v-text="physObjectMaterial"></td>
                        </tr>
                        <tr>
                            <td>Farbe</td>
                            <td v-text="physObjectFarbe"></td>
                        </tr>
                        <tr>
                            <td>Breite</td>
                            <td v-text="physObjectWidth"></td>
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td v-text="physObjectHeight"></td>
                        </tr>
                        <tr class="font-bold">
                            <td colspan="2">
                                Materialität Schreibmaterial
                            </td>
                        </tr>
                        <tr>
                            <td>Material</td>
                            <td v-text="physHandMaterial"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import PersonTooltip from './tooltip/PersonTooltip'
import PlaceTooltip from './tooltip/PlaceTooltip'
import OrganisationTooltip from './tooltip/OrganisationTooltip'
import LetterTooltip from './tooltip/LetterTooltip'
import SachkommentarTooltip from './tooltip/SachkommentarTooltip'
import FacsimileLink from './FacsimileLink'
import LetterFacsimile from './Facsimile'

import { replacePersons, replacePlaces, replaceOrganisations, replaceLetters, replaceSachkommentare, replaceNormalizations } from './helper_tooltips'
import { highlightTopics, highlightPersons, highlightOrgs, highlightPlaces, highlightNormalizations, highlightSachkommentare } from './helper_highlights'
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
        source: {
            type: Object,
            required: false,
            default () {
                return {}
            },
        }
    },
    data () {
        return {
            facsimileIndex: 0
        }
    },
    mounted () {
        console.debug('Mounted Letter/Detail/Normalized')
    },
    methods: {
        /***
         * @param {Object|Array} notes
         * @param {string} key
         * @returns {{author: *, text: *}[]}
         */
        physDescToArray (notes, key) {
            if (!Array.isArray(notes)) {
                notes = [notes]
            }

            let id = 1

            return notes.map((note) => {
                let author = note.scribeRef ? this.$store.getters.getPersonByRef(note.scribeRef) : null
                if (!author) {
                    if (note.n) {
                        author = note.n
                    } else if (note['xml:id']) {
                        author = note['xml:id']
                    }
                }

                return {
                    id: key + '-' + id++,
                    author: author.name ? author.name : author,
                    text: note['#text'],
                }
            })
        },
    },
    computed: {
        processedHtml () {
            const that = this
            const wrapper = document.createElement('div')
            wrapper.innerHTML = this.html

            highlightNormalizations(wrapper, (this.highlights && this.highlights.normalizations) ? this.highlights.normalizations.length > 0 : false)
            highlightSachkommentare(wrapper, (this.highlights && this.highlights.comments) ? this.highlights.comments.length > 0 : false)
            highlightPersons(wrapper, (this.highlights && this.highlights.persons) ? this.highlights.persons.length > 0 : false)
            highlightOrgs(wrapper, (this.highlights && this.highlights.organisations) ? this.highlights.organisations.length > 0 : false)
            highlightPlaces(wrapper, (this.highlights && this.highlights.places) ? this.highlights.places.length > 0 : false)
            highlightTopics(wrapper, (this.highlights && this.highlights.topics) ? this.highlights.topics : [])

            replaceNormalizations(wrapper)
            replaceSachkommentare(wrapper)
            replacePersons(wrapper, this.$store)
            replacePlaces(wrapper, this.$store)
            replaceOrganisations(wrapper, this.$store)
            replaceLetters(wrapper, this.$store)
            replaceFacsimiles(wrapper)

            // Show abbreviations when the expen part is "no" or "com"
            Array.from(wrapper.querySelectorAll('.tei_choice .tei_expan[data-n="no"],.tei_choice .tei_expan[data-n="com"]')).forEach(function (expan) {
                if (expan.closest('.tei_choice') && expan.closest('.tei_choice').querySelector('.tei_abbr')) {
                    expan.closest('.tei_choice').querySelector('.tei_abbr').setAttribute('data-show', 'true')
                }
            })

            return {
                name: 'NormalizedContent',
                template: wrapper.outerHTML,
                components: {
                    PersonTooltip,
                    PlaceTooltip,
                    OrganisationTooltip,
                    LetterTooltip,
                    SachkommentarTooltip,
                    FacsimileLink,
                },
                data () {
                    return {
                        PersonTooltip,
                        PlaceTooltip,
                        OrganisationTooltip,
                        LetterTooltip,
                        SachkommentarTooltip,
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
        },
        identifierSettlement () {
            return this.source?.msDesc?.msIdentifier?.settlement || null
        },
        identifierRepository () {
            return this.source?.msDesc?.msIdentifier?.repository || null
        },
        identifierIdno () {
            return this.source?.msDesc?.msIdentifier?.idno || null
        },
        physHandNotes () {
            return this.physDescToArray(this.source?.msDesc?.physDesc?.handDesc?.handNote || [], 'hand')
        },
        physTypeNotes () {
            return this.physDescToArray(this.source?.msDesc?.physDesc?.typeDesc?.typeNote || [], 'type')
        },
        physScriptNotes () {
            return this.physDescToArray(this.source?.msDesc?.physDesc?.scriptDesc?.scriptNote || [], 'script')
        },
        physObjectMaterial () {
            return this.source?.msDesc?.msPart?.physDesc?.objectDesc?.supportDesc?.support?.material || null
        },
        physObjectFarbe () {
            const color = (this.source?.msDesc?.msPart?.physDesc?.objectDesc?.supportDesc?.support?.note || []).filter((note) => {
                return note.type === 'color'
            })

            return color[0]?.['#text'] || ''
        },
        physObjectWidth () {
            return this.source?.msDesc?.msPart?.physDesc?.objectDesc?.supportDesc?.extent?.dimensions?.width + this.source?.msDesc?.msPart?.physDesc?.objectDesc?.supportDesc?.extent?.dimensions?.unit || null
        },
        physObjectHeight () {
            return this.source?.msDesc?.msPart?.physDesc?.objectDesc?.supportDesc?.extent?.dimensions?.height + this.source?.msDesc?.msPart?.physDesc?.objectDesc?.supportDesc?.extent?.unit || null
        },
        physHandMaterial () {
            return this.source?.msDesc?.msPart?.physDesc?.handDesc?.handNote || null
        },
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

/deep/ table:not(.table-source) tr td {
    @apply border border-dashed border-black;
}

/deep/ table.table-source tr td {
    @apply border border-gray-light;
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

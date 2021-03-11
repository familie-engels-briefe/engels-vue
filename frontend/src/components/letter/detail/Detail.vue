<template>
    <div class="mb-8">
        <Loading :loading="loading">
            <div class="flex flex-wrap lg:flex-nowrap justify-between">
                <h2 v-if="details"><span class="font-normal">{{ numberPublic }}</span> {{ title }}</h2>

                <div class="mt-2 mb-8 flex flex-row justify-between w-full lg:w-auto lg:mb-0 lg:ml-6 lg:flex-col">
                    <div class="mb-4 block lg:inline lg:h-8">
                        <LetterHighlighter v-on:update-highlights="updateHighlights"
                                           :html="htmlDiplomatic"
                                           :activeView="activeView"
                                           ref="letterHighlighter"></LetterHighlighter>
                    </div>
                    <div class="flex justify-end">
                        <Button class="mr-2"
                                title="Vorheriger Brief"
                                v-if="referencesPrevious"
                                v-on:click.native="goToLetter(referencesPrevious)">
                            <font-awesome-icon :icon="['far', 'arrow-left']"></font-awesome-icon>
                        </Button>
                        <Button title="Nächster Brief"
                                v-if="referencesNext"
                                v-on:click.native="goToLetter(referencesNext)">
                            <font-awesome-icon :icon="['far', 'arrow-right']"></font-awesome-icon>
                        </Button>
                    </div>
                </div>
            </div>

            <LetterNormalized v-if="htmlNormalized && activeView === 'normalisiert'"
                              :html="htmlNormalized"
                              :highlights="highlights"
                              :facsimiles="facsimiles"
                              :details="details"></LetterNormalized>
            <LetterDiplomatic v-if="htmlDiplomatic && activeView === 'diplomatisch'"
                              :html="htmlDiplomatic"
                              :highlights="highlights"
                              :facsimiles="facsimiles"></LetterDiplomatic>
            <LetterXml v-if="xmlContent && activeView === 'xml'"
                       :xml="xmlContent"></LetterXml>

            <LetterToolbar :active="activeView"
                           v-on:change-view="changeView"></LetterToolbar>
        </Loading>
    </div>
</template>

<script>
import axios from 'axios'

import Loading from './../../Loading'
import LetterNormalized from './Normalized'
import LetterDiplomatic from './Diplomatic'
import LetterXml from './Xml'
import LetterToolbar from './Toolbar'
import LetterHighlighter from './Highlighter'
import Button from '../../Button'

export default {
    name: 'LetterDetail',
    components: {
        Loading,
        LetterNormalized,
        LetterDiplomatic,
        LetterXml,
        LetterToolbar,
        LetterHighlighter,
        Button,
    },
    data () {
        return {
            // Letter meta data and details
            details: null,
            // Xml content
            xmlContent: null,
            // Html content
            htmlNormalized: null,
            htmlDiplomatic: null,
            // URLs to facsimiles
            facsimiles: null,
            // Which parts of the letter will be highlighted
            highlights: {
                topics: [],
                persons: [],
                places: [],
                organisations: [],
                letters: [],
                comments: [],
                textcomments: [],
                normalizations: [],
            },
            // Which views are active
            activeView: 'normalized',
            // If data is loading
            loading: true,
        }
    },
    props: {
        // Either pass a letter number...
        number: {
            type: String,
            required: false,
            default: null
        },
        // ...or a complete letter object
        letterLocal: {
            type: Object,
            required: false,
            default: function () {
                return null
            }
        }
    },
    created () {
        this.loadLetter()
    },
    mounted () {
        console.debug('Mounted Letter/Detail')
    },
    methods: {
        changeView (view) {
            this.activeView = view

            if (this.$refs.letterHighlighter) {
                this.$refs.letterHighlighter.resetHighlights()
            }
        },
        updateHighlights (event) {
            this.highlights = event.selected
        },
        goToLetter (letter) {
            this.$router.push({
                params: {
                    number: letter.number
                }
            })
        },
        loadLetter () {
            // Check if the given letter should be used
            if (this.letterLocal !== null) {
                console.debug('Loaded letter details locally')

                this.details = this.letterLocal.details
                this.xmlContent = this.letterLocal.xml
                this.htmlNormalized = this.letterLocal.html.norm
                this.htmlDiplomatic = this.letterLocal.html.dipl
                this.facsimiles = this.letterLocal.facsimiles
                this.loading = false
                return
            }

            if (this.number === null) {
                console.error('Either a letter number or a letter object is required!')
                return
            }

            // Otherwise fetch letters from the api
            let that = this

            axios.get(this.createApiUrl('letters/' + this.number))
                .then(function (response) {
                    that.details = response.data.details
                    that.xmlContent = response.data.xml
                    that.htmlNormalized = response.data.html.norm
                    that.htmlDiplomatic = response.data.html.dipl
                    that.facsimiles = response.data.facsimiles
                })
                .catch(function (err) {
                    that.displayAxiosError(err)
                })
                .then(function () {
                    that.loading = false
                })
        }
    },
    computed: {
        numberPublic () {
            const letter = this.$store.getters.getLetterByRef(this.details.number)
            if (!letter) {
                return null
            }

            return letter.numberPublic
        },
        doctypeName () {
            const letter = this.$store.getters.getLetterByRef(this.details.number)
            if (!letter) {
                return null
            }

            return letter.doctypeName
        },
        title () {
            const letter = this.$store.getters.getLetterByRef(this.details.number)
            if (!letter) {
                return null
            }

            const timestamp = Date.parse(letter.date)
            const date = new Date(timestamp)

            const sentName = letter.sent.person.name
            const sentPlace = letter.sent.place.name
            const receivedName = letter.received.person.name
            const receivedPlace = letter.received.place.name
            let formatedDate = null
            if (letter.date.length > 4) {
                formatedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
            } else {
                formatedDate = date.getFullYear()
            }

            return sentName + ', ' + sentPlace + ', an ' +
                receivedName + ', ' + receivedPlace + ', ' +
                formatedDate + ' (' + letter.doctypeName + ')'
        },
        referencesPrevious () {
            if (this.details && this.details.refs && this.details.refs.prev) {
                return this.$store.getters.getLetterByRef(this.details.refs.prev.target)
            }

            return null
        },
        referencesNext () {
            if (this.details && this.details.refs && this.details.refs.next) {
                return this.$store.getters.getLetterByRef(this.details.refs.next.target)
            }

            return null
        },
    },
    watch: {
        '$route' () {
            this.loadLetter()
        },
    },
}
</script>

<style scoped>
/**
 * Topics
 */
/deep/ .engels_topic.has-highlight {
    background-blend-mode: multiply;
}

/deep/ .engels_topic[data-type="W"] {
    @apply bg-blue-50;
}

/deep/ .engels_topic[data-type="R"] {
    @apply bg-purple-50;
}

/deep/ .engels_topic[data-type="P"] {
    @apply bg-red-50;
}

/deep/ .engels_topic[data-type="G"] {
    @apply bg-green-50;
}

/deep/ .engels_topic[data-type="E"] {
    @apply bg-yellow-50;
}

/deep/ .engels_topic[data-type="K"] {
    @apply bg-orange-50;
}

/deep/ .engels_topic[data-type="EB"] {
    @apply bg-amber-50;
}

/deep/ .engels_topic[data-type="H"] {
    @apply bg-lime-50;
}

/deep/ .engels_topic[data-type="M"] {
    @apply bg-teal-50;
}

/deep/ .engels_topic[data-type="F"] {
    @apply bg-cyan-50;
}

/deep/ .engels_topic[data-type="B"] {
    @apply bg-fuchsia-50;
}

/deep/ .engels_topic[data-type="L"] {
    @apply bg-rose-50;
}

/deep/ .engels_topic[data-type="KR"] {
    @apply bg-pink-50;
}

/deep/ .engels_topic[data-type="J"] {
    @apply bg-violet-50;
}

/deep/ .engels_topic[data-type="FEG"] {
    @apply bg-lightBlue-50;
}

/deep/ .engels_topic[data-type="FEK"] {
    @apply bg-lightBlue-100;
}

/deep/ .engels_topic[data-type="FEJ"] {
    @apply bg-lightBlue-200;
}

/deep/ .engels_topic[data-type="FEM"] {
    @apply bg-lightBlue-300;
}

/deep/ .engels_topic:not(.has-highlight) {
    @apply bg-transparent !important;
}

/deep/ .TMP.IGNORE {
    @apply text-lg font-bold not-italic mt-6 !important;
}

/deep/ .TMP.IGNORE hr {
    @apply mb-6;
}

/deep/ .TMP.IGNORE br {
    @apply hidden;
}

/deep/ .line-number {
    @apply text-gray absolute right-0 pr-16 -mt-6;
}

/* Hide annotations below letters */
/deep/ .TMP.IGNORE,
/deep/ .tei_back {
    @apply hidden;
}
</style>

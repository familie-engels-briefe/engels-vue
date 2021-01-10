<template>
    <div>
        <Loading :loading="loading">
            <div class="flex flex-wrap lg:flex-nowrap justify-between">
                <h2 v-if="details"><span class="font-normal">{{ numberPublic }}</span> {{ details.title }} ({{ doctypeName }})</h2>

                <div class="mt-2 mb-8 lg:mb-0 lg:ml-6">
                    <LetterHighlighter v-on:update-highlights="updateHighlights" :html="htmlDiplomatic"></LetterHighlighter>
                </div>
            </div>

            <LetterNormalized v-if="htmlNormalized && activeView === 'normalized'" :html="htmlNormalized" :highlights="highlights" :facsimiles="facsimiles"></LetterNormalized>
            <LetterDiplomatic v-if="htmlDiplomatic && activeView === 'diplomatic'" :html="htmlDiplomatic" :highlights="highlights" :facsimiles="facsimiles"></LetterDiplomatic>
            <LetterXml v-if="xmlContent && activeView === 'xml'" :xml="xmlContent"></LetterXml>

            <LetterToolbar :active="activeView" v-on:change-view="changeView"></LetterToolbar>
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

export default {
    name: 'LetterDetail',
    components: {
        Loading,
        LetterNormalized,
        LetterDiplomatic,
        LetterXml,
        LetterToolbar,
        LetterHighlighter
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
                dates: [],
                comments: []
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
    },
    mounted () {
        console.debug('Mounted Letter/Detail')
    },
    methods: {
        changeView (view) {
            this.activeView = view
        },
        updateHighlights (event) {
            this.highlights = event.selected
        },
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
        }
    }
}
</script>

<style scoped>
/**
 * Topics
 */
/deep/ .engels_topic.has-highlight {
    @apply text-white;

    background-blend-mode: multiply;
}
/deep/ .engels_topic[data-type="W"] {
    @apply bg-blue-600;
}
/deep/ .engels_topic[data-type="R"] {
    @apply bg-purple-600;
}
/deep/ .engels_topic[data-type="P"] {
    @apply bg-red-600;
}
/deep/ .engels_topic[data-type="G"] {
    @apply bg-green-600;
}
/deep/ .engels_topic[data-type="E"] {
    @apply bg-yellow-600;
}
/deep/ .engels_topic[data-type="K"] {
    @apply bg-orange-600;
}
/deep/ .engels_topic[data-type="EB"] {
    @apply bg-amber-600;
}
/deep/ .engels_topic[data-type="H"] {
    @apply bg-lime-600;
}
/deep/ .engels_topic[data-type="M"] {
    @apply bg-teal-600;
}
/deep/ .engels_topic[data-type="F"] {
    @apply bg-cyan-600;
}
/deep/ .engels_topic[data-type="B"] {
    @apply bg-fuchsia-600;
}
/deep/ .engels_topic[data-type="L"] {
    @apply bg-rose-600;
}
/deep/ .engels_topic[data-type="KR"] {
    @apply bg-pink-600;
}
/deep/ .engels_topic[data-type="J"] {
    @apply bg-violet-600;
}
/deep/ .engels_topic[data-type="FEG"] {
    @apply bg-lightBlue-600;
}
/deep/ .engels_topic[data-type="FEK"] {
    @apply bg-lightBlue-700;
}
/deep/ .engels_topic[data-type="FEJ"] {
    @apply bg-lightBlue-800;
}
/deep/ .engels_topic[data-type="FEM"] {
    @apply bg-lightBlue-900;
}
/deep/ .engels_topic:not(.has-highlight) {
    @apply bg-transparent !important;
}
</style>

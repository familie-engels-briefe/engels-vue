<template>
    <div>
        <Loading :loading="loading">
            <div class="flex flex-wrap lg:flex-nowrap justify-between">
                <h2 v-if="details" class="flex-grow">{{ details.title }}</h2>

                <div class="mt-2 mb-8 lg:mb-0 lg:ml-6">
                    <LetterHighlighter></LetterHighlighter>
                </div>
            </div>

            <div class="flex flex-wrap lg:-mx-6 pb-24">
                <div class="w-full mb-6 lg:w-1/2 lg:px-6 lg:mb-0">
                    <LetterFacsimile v-if="facsimiles" :facsimiles="facsimiles"></LetterFacsimile>
                </div>

                <div class="w-full lg:w-1/2 lg:px-6">
                    <LetterNormalized v-if="htmlNormalized && activeView === 'normalized'" :html="htmlNormalized"></LetterNormalized>
                    <LetterDiplomatic v-if="htmlDiplomatic && activeView === 'diplomatic'" :html="htmlDiplomatic"></LetterDiplomatic>
                    <LetterXml v-if="xmlContent && activeView === 'xml'" :xml="xmlContent"></LetterXml>
                </div>
            </div>

            <LetterToolbar :active="activeView" v-on:change-view="changeView"></LetterToolbar>
        </Loading>
    </div>
</template>

<script>
import axios from 'axios'

import Loading from './../../Loading'
import LetterFacsimile from './Facsimile'
import LetterNormalized from './Normalized'
import LetterDiplomatic from './Diplomatic'
import LetterXml from './Xml'
import LetterToolbar from './Toolbar'
import LetterHighlighter from './Highlighter'

export default {
    name: 'LetterDetail',
    components: {
        Loading,
        LetterFacsimile,
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
            // Which views are active
            activeView: 'normalized',
            // If data is loading
            loading: true
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
        }
    }
}
</script>

<style scoped>

</style>

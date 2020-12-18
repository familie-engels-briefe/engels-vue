<template>
    <div>
        <div class="pdf-viewer" v-text="error"></div>
    </div>
</template>

<script>
import PDFObject from 'pdfobject'

import './../../../mixins/urlbuilder'

export default {
    name: 'LetterFacsimile',
    props: {
        facsimiles: {
            type: Array,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            error: ''
        }
    },
    mounted () {
        console.debug('Mounted Letter/Facsimile')

        this.displayPdf()
    },
    methods: {
        displayPdf () {
            if (this.facsimiles.length > 0) {
                PDFObject.embed(this.createFacsimileUrl(this.facsimiles[this.index].url), this.$el.querySelector('.pdf-viewer'), {
                    fallbackLink: 'Der Browser unterstützt keine Anzeige von PDF Dateien. Sie können die Datei aber <a href="[url]" target="_blank" title="Facsimile herunterladen">herunterladen</a>.'
                })
            } else {
                this.error = 'Es gibt zu diesem Brief keine Facsimiles.'
            }
        }
    },
    watch: {
        index () {
            console.debug('Changed facsimile')

            this.displayPdf()
        }
    }
}
</script>

<style scoped>
.pdf-viewer {
    height: 48rem;
}
</style>

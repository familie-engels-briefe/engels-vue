<template>
    <div>
        <div class="pdf-viewer" v-text="error"></div>
    </div>
</template>

<script>
import PDFObject from 'pdfobject'

export default {
    name: 'LetterFacsimile',
    props: {
        facsimiles: {
            type: Array,
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
                console.log(this.createFacsimileUrl(this.facsimiles[0].url))
                PDFObject.embed(this.createFacsimileUrl(this.facsimiles[0].url), this.$el.querySelector('.pdf-viewer'))
            } else {
                this.error = 'Es gibt zu diesem Brief keine Facsimiles.'
            }
        }
    },
    watch: {
        facsimiles () {
            console.log('Changed facs')

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

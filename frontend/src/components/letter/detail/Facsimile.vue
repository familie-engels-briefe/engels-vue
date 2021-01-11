<template>
    <div>
        <div class="pdf-viewer"
             v-text="error"></div>
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
            error: '',
            offsetTop: 0
        }
    },
    mounted () {
        console.debug('Mounted Letter/Facsimile')

        this.displayPdf()

        const pdfViewer = this.$el.querySelector('.pdf-viewer')
        this.offsetTop = pdfViewer.getBoundingClientRect().top

        document.addEventListener('scroll', this.scrollHandler)
        this.scrollHandler()

        window.addEventListener('resize', this.resizeHandler)
        this.resizeHandler()
    },
    beforeDestroy () {
        document.removeEventListener('scroll', this.scrollHandler)
    },
    methods: {
        displayPdf () {
            if (this.facsimiles.length > 0 && this.facsimiles[this.index]) {
                PDFObject.embed(this.createFacsimileUrl(this.facsimiles[this.index].url), this.$el.querySelector('.pdf-viewer'), {
                    fallbackLink: 'Der Browser unterstützt keine Anzeige von PDF Dateien. Sie können die Datei aber <a href="[url]" target="_blank" title="Facsimile herunterladen">herunterladen</a>.'
                })
            } else {
                this.error = 'Es gibt zu diesem Brief keine Facsimiles.'
            }
        },
        scrollHandler () {
            const pdfViewer = this.$el.querySelector('.pdf-viewer')
            const scrollTop = window.pageYOffset
            const browserWidth = Math.max(
                document.body.scrollWidth,
                document.documentElement.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.offsetWidth,
                document.documentElement.clientWidth
            )

            // Add/remove fixed position of facsimile based on scrolling position
            if (browserWidth >= 1024 && scrollTop >= this.offsetTop && !pdfViewer.classList.contains('fixed')) {
                pdfViewer.classList.add('fixed', 'top-0')
            } else if (browserWidth < 1024 || (scrollTop < this.offsetTop && pdfViewer.classList.contains('fixed'))) {
                pdfViewer.classList.remove('fixed', 'top-0')
            }
        },
        resizeHandler () {
            const pdfViewer = this.$el.querySelector('.pdf-viewer')

            // Set pdf width to parent node width.
            // If the position is fixed, it is not calculated correctly
            pdfViewer.style.width = pdfViewer.parentNode.offsetWidth + 'px'

            const browserWidth = Math.max(
                document.body.scrollWidth,
                document.documentElement.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.offsetWidth,
                document.documentElement.clientWidth
            )

            // Check if pdf should be fixed if browser gets wider
            this.scrollHandler()

            // Remove the fixed position if the browser gets too small
            if (browserWidth < 1024 && pdfViewer.classList.contains('fixed')) {
                pdfViewer.classList.remove('fixed', 'top-0')
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

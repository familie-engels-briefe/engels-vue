<template>
    <div class="fixed left-0 right-0 bottom-0 bg-black toolbar">
        <div class="max-w-6xl w-full mx-auto px-4 md:px-8 lg:px-0 py-8 text-gray-lighter flex flex-col lg:justify-center lg:flex-row">
            <a class="toolbar-item"
               :class="{ 'toolbar-item-active': active === 'normalisiert' }"
               @click="changeLetterView('normalisiert')">
                <font-awesome-icon :icon="['far', 'align-justify']"
                                   size="lg"></font-awesome-icon>

                <span class="toolbar-item-text">Normalisierte Ansicht</span>
            </a>

            <a class="toolbar-item"
               :class="{ 'toolbar-item-active': active === 'diplomatisch' }"
               @click="changeLetterView('diplomatisch')">
                <font-awesome-icon :icon="['far', 'align-left']"
                                   size="lg"></font-awesome-icon>

                <span class="toolbar-item-text">Diplomatische Ansicht</span>
            </a>

            <a class="toolbar-item"
               :class="{ 'toolbar-item-active': active === 'xml' }"
               @click="changeLetterView('xml')">
                <font-awesome-icon :icon="['far', 'code']"
                                   size="lg"></font-awesome-icon>

                <span class="toolbar-item-text">XML Datenansicht</span>
            </a>

            <a class="toolbar-item toolbar-item-small"
               title="Zitierfähige Quelle in Zwischenablage kopieren"
               @click="copyQuote">
                <font-awesome-icon :icon="['fas', 'quote-right']"
                                   size="lg"></font-awesome-icon>
            </a>
        </div>
    </div>
</template>

<script>
function fallbackCopyTextToClipboard (text) {
    let textArea = document.createElement("textarea")
    textArea.value = text

    // Avoid scrolling to bottom
    textArea.style.top = "0"
    textArea.style.left = "0"
    textArea.style.position = "fixed"

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
        let successful = document.execCommand('copy')
        let msg = successful ? 'successful' : 'unsuccessful'
        console.log('Fallback: Copying text command was ' + msg)
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err)
    }

    document.body.removeChild(textArea)
}

function copyTextToClipboard (text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text)
        return
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!')
    }, function (err) {
        console.error('Async: Could not copy text: ', err)
    })
}

export default {
    name: 'LetterToolbar',
    props: {
        active: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            toolbar: null,
            footer: null
        }
    },
    mounted () {
        console.debug('Mounted Letter/Toolbar')

        const hash = window.location.hash.replace('#', '')
        if (hash === 'normalisiert' || hash === 'diplomatisch' || hash === 'xml') {
            this.changeLetterView(hash)
        } else {
            this.changeLetterView('normalisiert')
        }

        this.toolbar = this.$el
        this.footer = document.querySelector('footer')

        if (!this.toolbar) {
            console.error('Toolbar could not be found!')
            return
        }

        if (!this.footer) {
            console.error('Footer could not be found!')
            return
        }

        document.addEventListener('scroll', this.checkOffset)
    },
    methods: {
        changeLetterView (view) {
            console.debug('Change letter view to', view)

            window.location.hash = view

            this.$emit('change-view', view)
        },
        checkOffset () {
            function getRectTop (el) {
                let rect = el.getBoundingClientRect()
                return rect.top
            }

            if ((getRectTop(this.toolbar) + document.body.scrollTop) + this.toolbar.offsetHeight >= (getRectTop(this.footer) + document.body.scrollTop)) {
                this.toolbar.classList.add('toolbar-bottom')
            }

            if (document.body.scrollTop + window.innerHeight < (getRectTop(this.footer) + document.body.scrollTop)) {
                this.toolbar.classList.remove('toolbar-bottom')
            }
        },
        copyQuote () {
            const prefix = 'Familie Engels in Briefen'
            const date = new Date()
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()

            const quote = prefix + ' ' + window.location.href + ' (' + day + '.' + month + '.' + year + ')'
            copyTextToClipboard(quote)

            alert(`Die zitierfähige Quelle:\n\n${quote}\n\nwurde in Ihre Zwischenablage kopiert.`)
        },
    }
}
</script>

<style scoped>
.toolbar {
    transition: margin-bottom .1s ease;
}

.toolbar-bottom {
    margin-bottom: 46px;

    transition: margin-bottom .1s ease;
}

.toolbar-item {
    @apply block w-full bg-gray-dark2 px-4 py-2 text-sm cursor-pointer mb-2;
}

.toolbar-item-small {
    @apply w-auto;
}

.toolbar-item:last-child {
    @apply mb-0
}

@media (min-width: 1024px) {
    .toolbar-item {
        @apply p-4 mx-6 mb-0;
    }
}

.toolbar-item:hover,
.toolbar-item-active {
    @apply bg-gray-light text-black;
}

.toolbar-item-text {
    @apply inline pl-3;
}
</style>

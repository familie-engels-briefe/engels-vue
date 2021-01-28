<template>
    <div class="fixed left-0 right-0 bottom-0 bg-black toolbar">
        <div class="max-w-6xl w-full mx-auto px-4 md:px-8 lg:px-0 py-8 text-gray-lighter flex flex-col lg:justify-center lg:flex-row">
            <a class="toolbar-item"
               :class="{ 'toolbar-item-active': active === 'normalized' }"
               @click="changeLetterView('normalized')">
                <font-awesome-icon :icon="['far', 'align-justify']"
                                   size="lg"></font-awesome-icon>

                <span class="toolbar-item-text">Normalisierte Ansicht</span>
            </a>

            <a class="toolbar-item"
               :class="{ 'toolbar-item-active': active === 'diplomatic' }"
               @click="changeLetterView('diplomatic')">
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
        </div>
    </div>
</template>

<script>
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
        if (hash === 'normalized' || hash === 'diplomatic' || hash === 'xml') {
            this.changeLetterView(hash)
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
                var rect = el.getBoundingClientRect()
                return rect.top
            }

            if ((getRectTop(this.toolbar) + document.body.scrollTop) + this.toolbar.offsetHeight >= (getRectTop(this.footer) + document.body.scrollTop)) {
                this.toolbar.classList.add('toolbar-bottom')
            }

            if (document.body.scrollTop + window.innerHeight < (getRectTop(this.footer) + document.body.scrollTop)) {
                this.toolbar.classList.remove('toolbar-bottom')
            }
        },
    }
}
</script>

<style scoped>
.toolbar {
    transition: margin-bottom .2s ease;
}

.toolbar-bottom {
    margin-bottom: 46px;

    transition: margin-bottom .2s ease;
}

.toolbar-item {
    @apply block w-full bg-gray-dark2 px-4 py-2 text-sm cursor-pointer mb-2;
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

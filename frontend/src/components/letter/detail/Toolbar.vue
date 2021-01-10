<template>
    <div class="fixed bottom-0 left-0 right-0 bg-black">
        <div class="max-w-6xl w-full mx-auto px-8 md:px-4 lg:px-0 py-8 text-gray-lighter flex justify-center">
            <a class="toolbar-item" :class="{ 'toolbar-item-active': active === 'normalized' }" @click="changeLetterView('normalized')">
                <font-awesome-icon :icon="['far', 'align-justify']" size="lg"></font-awesome-icon>

                <span class="toolbar-item-text">Normalisierte Ansicht</span>
            </a>

            <a class="toolbar-item" :class="{ 'toolbar-item-active': active === 'diplomatic' }" @click="changeLetterView('diplomatic')">
                <font-awesome-icon :icon="['far', 'align-left']" size="lg"></font-awesome-icon>

                <span class="toolbar-item-text">Diplomatische Ansicht</span>
            </a>

            <a class="toolbar-item" :class="{ 'toolbar-item-active': active === 'xml' }" @click="changeLetterView('xml')">
                <font-awesome-icon :icon="['far', 'code']" size="lg"></font-awesome-icon>

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
    mounted () {
        const hash = window.location.hash.replace('#', '')
        if (hash === 'normalized' || hash === 'diplomatic' || hash === 'xml') {
            this.changeLetterView(hash)
        }
    },
    methods: {
        changeLetterView (view) {
            console.debug('Change letter view to', view)

            window.location.hash = view

            this.$emit('change-view', view)
        }
    }
}
</script>

<style scoped>
.toolbar-item {
    @apply bg-gray-dark2 p-4 mx-6 text-sm cursor-pointer;
}

.toolbar-item:hover,
.toolbar-item-active {
    @apply bg-gray-light text-black;
}

.toolbar-item-text {
  @apply inline-block ml-3;
}
</style>

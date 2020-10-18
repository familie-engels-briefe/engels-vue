<template>
    <div class="fixed bottom-0 left-0 right-0 bg-black">
        <div class="max-w-6xl w-full mx-auto px-8 md:px-4 lg:px-0 py-8 text-gray-lighter flex justify-center">
            <div class="toolbar-item" :class="{ 'toolbar-item-active': active === 'normalized' }" @click="changeLetterView('normalized')">
                <div>
                    <font-awesome-icon :icon="['far', 'align-justify']" size="lg"></font-awesome-icon>
                </div>

                <div>
                    Normalisierte Ansicht
                </div>
            </div>

            <div class="toolbar-item" :class="{ 'toolbar-item-active': active === 'diplomatic' }" @click="changeLetterView('diplomatic')">
                <div>
                    <font-awesome-icon :icon="['far', 'align-left']" size="lg"></font-awesome-icon>
                </div>

                <div>
                    Diplomatische Ansicht
                </div>
            </div>

            <div class="toolbar-item" :class="{ 'toolbar-item-active': active === 'xml' }" @click="changeLetterView('xml')">
                <div>
                    <font-awesome-icon :icon="['far', 'code']" size="lg"></font-awesome-icon>
                </div>

                <div>
                    XML Datenansicht
                </div>
            </div>
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
    methods: {
        changeLetterView (view) {
            console.debug('Change letter view to', view)

            this.$emit('change-view', view)
        }
    }
}
</script>

<style scoped>
.toolbar-item {
    @apply bg-gray-dark2 p-2 mx-6 text-center text-sm flex flex-col justify-around cursor-pointer;

    width: 7rem;
    height: 7rem;
}

.toolbar-item:hover,
.toolbar-item-active {
    @apply bg-gray-darker;
}
</style>

<template>
    <div class="relative">
        <transition name="fade">
            <Button v-show="!showHighlighter" v-on:click.native="showHighlighter = !showHighlighter"
                    :classes="['absolute', 'right-0']">
                Hervorhebungen
                <font-awesome-icon :icon="['far', 'highlighter']"></font-awesome-icon>
            </Button>
        </transition>

        <transition name="fade">
            <div class="bg-white w-64 p-3 absolute right-0 shadow" v-show="showHighlighter">
                <div class="flex justify-between border-b border-gray pb-2 px-2 mb-2">
                    <div>
                        <font-awesome-icon :icon="['far', 'highlighter']"></font-awesome-icon>
                        <span class="uppercase text-lg pl-2">Hervorhebungen</span>
                    </div>
                    <div v-on:click="showHighlighter = false" class="cursor-pointer hover:text-gray-darker">
                        <font-awesome-icon :icon="['far', 'times']" size="lg"></font-awesome-icon>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Button from '../../Button'

export default {
    name: 'LetterHighlighter',
    components: {
        Button
    },
    data () {
        return {
            showHighlighter: false
        }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    @apply transition-opacity duration-200;
}

.fade-enter, .fade-leave-to {
    @apply opacity-0;
}
</style>

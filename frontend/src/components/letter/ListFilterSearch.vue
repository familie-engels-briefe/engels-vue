<template>
    <div>
        <label class="flex justify-between cursor-pointer hover:bg-gray-dark hover:text-white py-1 px-2 mb-2"
               :for="name"
               v-on:click="active = !active">
            <span v-text="title"></span>
            <span>
                <font-awesome-icon :icon="icon" size="lg"></font-awesome-icon>
            </span>
        </label>

        <transition
            name="expand"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave">
            <div class="relative will-change-height" v-show="active">
                <span class="absolute icon-input">
                    <font-awesome-icon :icon="['far', 'search']"></font-awesome-icon>
                </span>

                <vue-tags-input
                    v-model="tag"
                    :tags="tags"
                    :autocomplete-items="unusedTags"
                    :placeholder="placeholder"
                    v-on:tags-changed="changedTags"
                ></vue-tags-input>
            </div>
        </transition>
    </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'

export default {
    name: 'ListFilterSearch',
    components: {
        VueTagsInput
    },
    props: {
        title: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        autocompleteItems: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            active: false,
            tags: [],
            tag: ''
        }
    },
    computed: {
        icon () {
            let icon = [
                'far'
            ]

            if (this.active) {
                icon.push('angle-up')
            } else {
                icon.push('angle-down')
            }

            return icon
        },
        /**
         * Filter already used tags.
         *
         * @returns {Array}
         */
        unusedTags () {
            const that = this

            return this.autocompleteItems.filter(function (usedTag) {
                if (typeof usedTag.text !== 'string') {
                    return false
                }

                return usedTag.text.toLowerCase().indexOf(that.tag.toLowerCase()) !== -1
            })
        }
    },
    methods: {
        changedTags (tags) {
            this.$emit('changed-tags', {
                type: this.name,
                tags: tags
            })
        },
        enter (element) {
            element.style.width = getComputedStyle(element).width
            element.style.position = 'absolute'
            element.style.visibility = 'hidden'
            element.style.height = 'auto'

            const height = getComputedStyle(element).height

            element.style.width = null
            element.style.position = null
            element.style.visibility = null
            element.style.height = 0

            // Force repaint to make sure the animation is triggered correctly.
            getComputedStyle(element).height

            requestAnimationFrame(() => {
                element.style.height = height
            })
        },
        afterEnter (element) {
            element.style.height = 'auto'
        },
        leave (element) {
            element.style.height = getComputedStyle(element).height

            // Force repaint to make sure the animation is triggered correctly.
            getComputedStyle(element).height

            requestAnimationFrame(() => {
                element.style.height = 0
            })
        },
    }
}
</script>

<style scoped>
input[type="search"]::placeholder {
    @apply text-gray-darker;
}

.icon-input {
    @apply text-gray-light;

    top: .5rem;
    left: .5rem;
}

/deep/ .ti-input {
    @apply rounded;
}

/deep/ .ti-new-tag-input {
    @apply text-base;
}

/deep/ .ti-tag {
    @apply text-base;
}

.expand-enter-active,
.expand-leave-active {
    transition: height .2s ease-in-out;
    overflow: hidden;
}

.expand-enter,
.expand-leave-to {
    height: 0;
}

.will-change-height {
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
}
</style>

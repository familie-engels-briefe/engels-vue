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
            <div :class="classes" v-show="active">
                <label v-for="item in items" :key="item.id" class="block mb-2 px-2 py-1 cursor-pointer engels_topic has-highlight hover:opacity-75" :data-type="item.id">
                    <input :type="type" :name="inputName(item)" v-on:change="toggleItem(item)" class="align-middle"> {{ item.name }}
                </label>

                <label v-if="type === 'radio'">
                    <a class="inline-block mt-4 cursor-pointer float-right border border-gray-dark px-2 py-1 hover:bg-gray-lighter" v-on:click="clearSelectedItems()">Filter zurücksetzen</a>
                </label>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'HighlighterSearch',
    props: {
        title: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        classes: {
            required: true
        },
        type: {
            required: false,
            default () {
                return 'checkbox'
            }
        }
    },
    data () {
        return {
            active: false,
            selectedItems: [],
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
    },
    methods: {
        toggleItem (item) {
            if (this.type === 'checkbox') {
                if (this.selectedItems.indexOf(item.id) >= 0) {
                    this.selectedItems.splice(this.selectedItems.indexOf(item.id), 1)
                } else {
                    this.selectedItems.push(item.id)
                }
            } else {
                this.selectedItems = [item.id]
            }

            this.$emit('update-items', {
                name: this.name,
                items: this.selectedItems
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
        inputName (item) {
            if (this.type === 'checkbox') {
                return 'highlight-checkbox-' + this.name + '-' + item.id
            }

            return 'highlight-radio-' + this.name
        },
        clearSelectedItems () {
            console.debug('Reset items')

            this.selectedItems.splice(0)
            this.$el.querySelectorAll('input[type="radio"]').forEach(function (radio) {
                radio.checked = false
            })
        },
    }
}
</script>

<style scoped>
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

/deep/ .ti-input {
    @apply rounded relative z-10;
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

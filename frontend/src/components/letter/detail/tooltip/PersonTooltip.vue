<template>
    <span>
        <Tooltip :content="person.name || 'Unbekannte Person'" :url="url" :classes="classes"><slot></slot></Tooltip>
    </span>
</template>

<script>
import Tooltip from '../../../Tooltip'

export default {
    name: 'PersonTooltip',
    components: {
        Tooltip
    },
    props: {
        person: {
            type: Object,
            required: true
        },
        hasHighlight: {
            required: false,
            default() {
                return false
            },
        },
    },
    computed: {
        url: function () {
            if (!this.person || !this.person['xml:id']) {
                return null
            }

            return {
                name: 'register.person',
                params: {
                    'id': this.person['xml:id']
                }
            }
        },
        classes() {
            let classes = 'person-tooltip cursor-help'
            if (this.hasHighlight) {
                classes += ' has-highlight'
            }

            return classes
        }
    },
}
</script>

<style scoped>
/deep/ .person-tooltip.has-highlight > .tooltip-button {
    @apply bg-indigo-50;
}
</style>

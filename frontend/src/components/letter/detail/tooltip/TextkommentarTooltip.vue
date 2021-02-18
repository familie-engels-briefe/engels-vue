<template>
    <span>
        <Tooltip :content="html" :classes="classes"><slot></slot></Tooltip>
    </span>
</template>

<script>
import Tooltip from '../../../Tooltip'

export default {
    name: 'TextkommentarTooltip',
    components: {
        Tooltip
    },
    props: {
        html: {
            type: String,
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
        classes() {
            let classes = 'textkommentar-tooltip cursor-help'
            if (this.hasHighlight) {
                classes += ' has-highlight'
            }

            return classes
        }
    },
}
</script>

<style scoped>
/deep/ .textkommentar-tooltip.has-highlight > .tooltip-button {
    @apply bg-warmGray-100;
}
</style>

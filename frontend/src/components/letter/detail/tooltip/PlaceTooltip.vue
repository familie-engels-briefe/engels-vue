<template>
    <span>
        <Tooltip :content="place.name || 'Unbekannter Ort'" :url="url" :classes="classes"><slot></slot></Tooltip>
    </span>
</template>

<script>
import Tooltip from '../../../Tooltip'

export default {
    name: 'PlaceTooltip',
    components: {
        Tooltip
    },
    props: {
        place: {
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
            if (!this.place || !this.place['xml:id']) {
                return null
            }

            return {
                name: 'register.place',
                params: {
                    'id': this.place['xml:id']
                }
            }
        },
        classes() {
            let classes = "place-tooltip cursor-help"
            if (this.hasHighlight) {
                classes += ' has-highlight'
            }

            return classes
        }
    },
}
</script>

<style scoped>
/deep/ .place-tooltip.has-highlight > .tooltip-button {
    @apply bg-emerald-100;
}
</style>

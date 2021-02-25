<template>
    <span>
        <Tooltip :content="org.name || 'Unbekannte Organisation'" :url="url" :classes="classes"><slot></slot></Tooltip>
    </span>
</template>

<script>
import Tooltip from '../../../Tooltip'

export default {
    name: 'OrganisationTooltip',
    components: {
        Tooltip
    },
    props: {
        org: {
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
            if (!this.org || !this.org['xml:id']) {
                return null
            }

            return {
                name: 'register.org',
                params: {
                    'id': this.org['xml:id']
                }
            }
        },
        classes() {
            let classes = 'organisation-tooltip cursor-help'
            if (this.hasHighlight) {
                classes += ' has-highlight'
            }

            return classes
        }
    },
}
</script>

<style scoped>
/deep/ .org-tooltip.has-highlight > .tooltip-button {
    @apply bg-blueGray-50;
}
</style>

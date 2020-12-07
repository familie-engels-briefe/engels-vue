<template>
    <span>
        <Tooltip :content="org.name || 'Unbekannte Organisation'" :url="url"><slot></slot></Tooltip>
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
        }
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
    },
}
</script>

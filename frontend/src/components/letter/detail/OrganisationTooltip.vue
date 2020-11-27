<template>
    <span>
        <Tooltip :content="org.name || 'Unbekannt'"><slot></slot></Tooltip>
    </span>
</template>

<script>
import Tooltip from '../../Tooltip'

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
    }
}
</script>

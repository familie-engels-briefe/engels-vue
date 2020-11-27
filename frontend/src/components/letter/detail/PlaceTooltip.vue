<template>
    <span>
        <Tooltip :content="place.name || 'Unbekannt'"><slot></slot></Tooltip>
    </span>
</template>

<script>
import Tooltip from '../../Tooltip'

export default {
    name: 'PlaceTooltip',
    components: {
        Tooltip
    },
    props: {
        place: {
            type: Object,
            required: true
        }
    }
}
</script>

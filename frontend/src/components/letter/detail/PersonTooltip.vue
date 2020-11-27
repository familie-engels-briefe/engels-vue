<template>
    <span>
        <Tooltip :content="person.name || ''"><slot></slot></Tooltip>
    </span>
</template>

<script>
import Tooltip from '../../Tooltip'

export default {
    name: 'PersonTooltip',
    components: {
        Tooltip
    },
    props: {
        person: {
            type: Object,
            required: true
        }
    }
}
</script>

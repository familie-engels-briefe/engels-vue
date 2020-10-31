<template>
    <span>
        <Tooltip :content="tooltip">{{ name }}</Tooltip>
    </span>
</template>

<script>
import Tooltip from '../../Tooltip'

export default {
    name: 'Person',
    components: {
        Tooltip
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data () {
        console.debug('Mounting person', this.id)

        return {
            tooltip: 'Details über ' + this.id,
            name: this.id
        }
    }
}
</script>

<style scoped>

</style>

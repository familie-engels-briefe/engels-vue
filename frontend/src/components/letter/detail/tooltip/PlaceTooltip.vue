<template>
    <span>
        <Tooltip :content="place.name || 'Unbekannter Ort'" :url="url"><slot></slot></Tooltip>
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
    },
}
</script>

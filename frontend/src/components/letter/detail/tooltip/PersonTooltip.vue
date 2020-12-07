<template>
    <span>
        <Tooltip :content="person.name || 'Unbekannte Person'" :url="url"><slot></slot></Tooltip>
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
        }
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
    },
}
</script>

<template>
    <a v-on:click="openFacsimile" class="cursor-pointer text-purple-600">
        Seite {{ page }}
    </a>
</template>

<script>
export default {
    name: 'FacsimileLink',
    props: {
        filename: {
            type: String,
            required: true,
        },
        page: {
            type: Number,
            required: false,
            default () {
                return 1
            }
        }
    },
    methods: {
        openFacsimile () {
            this.$emit('facsimile-change', this.filename)
        }
    }
}
</script>

<style scoped>

</style>

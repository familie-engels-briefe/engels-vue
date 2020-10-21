<template>
    <button type="button" class="text-gray-dark border border-gray-dark bg-transparent rounded hover:bg-gray-lighter active:bg-gray px-2 py-1 cursor-pointer focus:outline-none focus:shadow-outline" v-on:click="click">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'Button',
    methods: {
        click: function (e) {
            this.$emit('click', e)
        }
    }
}
</script>

<style scoped>

</style>

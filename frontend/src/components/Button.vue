<template>
    <button type="button" class="text-gray-dark border border-gray-dark bg-transparent rounded hover:bg-gray-lighter active:bg-gray px-2 py-1 cursor-pointer focus:outline-none focus:shadow-outline" :class="classes">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        classes: {
            required: false,
            default () {
                return []
            }
        }
    }
}
</script>

<style scoped>

</style>

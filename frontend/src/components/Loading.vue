<template>
    <div class="loading-wrapper">
        <template v-if="loading">
            <div class="flex justify-center py-8">
                <div class="sk-plane"></div>
            </div>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </div>
</template>

<script>
import 'spinkit/spinkit.css'

export default {
    name: 'Loading',
    props: {
        loading: {
            type: Boolean,
            required: false,
            default: function () {
                return false
            }
        }
    }
}
</script>

<style scoped>

</style>

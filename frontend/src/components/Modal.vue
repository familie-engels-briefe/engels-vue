<template>
    <div class="absolute inset-0 flex flex-col justify-center" style="background-color: rgba(0, 0, 0, .6)" v-if="show">
        <div class="bg-white shadow-2xl mx-4 my-4 px-6 py-4 max-h-screen overflow-auto md:max-w-xl md:mx-auto md:px-10 md:py-8 lg:max-w-4xl lg:px-20 lg:py-16 xl:max-w-6xl relative">
            <a v-on:click="$emit('close')" class="p-4 cursor-pointer text-gray-dark2 hover:text-gray absolute" style="top: .5rem; right: .5rem"><font-awesome-icon :icon="['far', 'times']"></font-awesome-icon></a>
            <h2><slot name="header"></slot></h2>
            <div class="pb-4"><slot name="content"></slot></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        show: {
            type: Boolean,
            required: false,
            default () {
                return false
            }
        }
    }
}
</script>

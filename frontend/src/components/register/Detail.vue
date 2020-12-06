<template>
    <div class="register-detail" :id="'register-detail-' + id">
        <h2 v-text="title"></h2>

        <Loading :loading="content === null">
            <a v-if="image !== null" :href="image.url" target="_blank" class="float-left mr-4 mb-4">
                <img class="block" :alt="'Bild von ' + title" :src="image.thumbnail">
            </a>
            <div v-html="content" v-if="content !== ''" class="mb-8"></div>

            <div v-if="urls.length > 0">
                <h3>Weiterführende Links</h3>
                <ul>
                    <li v-for="url in urls" :key="url.key">
                        <a :href="url.href" target="_blank">
                            <font-awesome-icon :icon="['far', 'external-link']"></font-awesome-icon> {{ url.title }}
                        </a>
                    </li>
                </ul>
            </div>
        </Loading>
    </div>
</template>

<script>
import Loading from '../Loading'

export default {
    name: 'RegisterDetail',
    components: {
        Loading,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: false,
        },
        image: {
            type: Object,
            required: false,
        },
        urls: {
            type: Array,
            required: false,
        }
    },
}
</script>

<style scoped>
h3 {
    @apply text-2xl font-bold mb-4;
}

ul {
    @apply block ml-8 list-disc;
}
</style>

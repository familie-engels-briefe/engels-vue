<template>
    <footer class="bg-gray-darker text-gray-lightest text-sm relative">
        <div class="max-w-6xl mx-auto px-8 md:px-4 py-4 leading-none flex justify-between">
            <div>
                <router-link to="/datenschutzerklärung">Datenschutzerklärung</router-link> | <router-link to="/impressum">Impressum</router-link>
            </div>
            <div>
                <a href="https://github.com/familie-engels-briefe/webapp/"><font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon></a>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>

</style>

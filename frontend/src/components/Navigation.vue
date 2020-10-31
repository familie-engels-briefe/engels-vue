<template>
    <header class="flex flex-row py-4 mb-12">
        <div>
            <h1 class="text-2xl font-medium tracking-wide">
                <router-link to="/" title="Industriegeschichte Privat - Die Familie Engels in Briefen (1791 - 1851)">
                    Industriegeschichte Privat
                </router-link>
            </h1>
        </div>

        <nav class="flex-grow pt-2">
            <ul class="flex flex-row justify-end">
                <li>
                    <router-link to="/briefe">Briefe</router-link>
                </li>
                <li>
                    <router-link to="/register">Register</router-link>
                </li>
                <li>
                    <router-link to="/kontext">Kontext</router-link>
                </li>
                <li>
                    <router-link to="/edition">Edition</router-link>
                </li>
                <li>
                    <font-awesome-icon :icon="['far', 'search']"></font-awesome-icon>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Navigation'
}
</script>

<style scoped>
li {
    @apply font-bold px-2;
}

li a {
    @apply px-2 text-brown border-transparent border-b-2;
}

li a.router-link-active {
    @apply border-gold;
}
</style>

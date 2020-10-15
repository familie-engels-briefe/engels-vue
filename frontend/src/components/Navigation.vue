<template>
    <nav class="flex-grow pt-2">
        <ul class="flex flex-row justify-end">
            <li><router-link to="/briefe">Briefe</router-link></li>
            <li><router-link to="/korrespondenzen">Korrespondenzen</router-link></li>
            <li><router-link to="/register">Register</router-link></li>
            <li><router-link to="/historischer-kontext">Historischer Kontext</router-link></li>
            <li><router-link to="/edition">Edition</router-link></li>
            <li><font-awesome-icon :icon="['far', 'search']"></font-awesome-icon></li>
        </ul>
    </nav>
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

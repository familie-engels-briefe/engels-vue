<template>
    <header class="flex flex-wrap flex-row py-4 mb-12 md:flex-nowrap">
        <div class="flex-shrink mb-4 md:mb-0">
            <h1 class="text-2xl font-medium tracking-wide">
                <router-link to="/"
                             title="Industriegeschichte Privat - Die Familie Engels in Briefen (1791 - 1851)">
                    Industriegeschichte&nbsp;Privat
                </router-link>
            </h1>
        </div>

        <nav class="flex-grow pt-2">
            <ul class="flex flex-row justify-between md:justify-end">
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
                    <a class="cursor-pointer dropdown"
                       :class="{ 'dropdown-visible': dropdownVisible }"
                       v-click-outside="hideDropdown"
                       v-on:click="toggleDropdown">
                        <font-awesome-icon :icon="['far', 'caret-down']"></font-awesome-icon>&nbsp;Projekt

                        <ul>
                            <li>
                                <router-link to="/mitwirkende">Mitwirkende</router-link>
                            </li>

                            <li>
                                <router-link to="/foerderer">Förderer</router-link>
                            </li>

                            <li>
                                <router-link to="/editorischer-bericht">Editorischer Bericht</router-link>
                            </li>
                        </ul>
                    </a>
                </li>
                <li>
                    <Search></Search>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import ClickOutside from 'vue-click-outside'

import Search from './Search'

export default {
    name: 'Navigation',
    components: {
        Search
    },
    data () {
        return {
            dropdownVisible: false
        }
    },
    methods: {
        hideDropdown () {
            this.dropdownVisible = false
        },
        toggleDropdown () {
            this.dropdownVisible = !this.dropdownVisible
        },
    },
    directives: {
        ClickOutside
    },
}
</script>

<style scoped>
li {
    @apply font-bold px-2;
}

li a {
    @apply px-2 text-brown border-transparent border-b-2;
}

li a.dropdown {
    @apply border-b-0;
}

li a.router-link-active {
    @apply border-gold;
}

nav ul ul {
    @apply hidden bg-white py-2 shadow absolute z-20;
}

li a.dropdown-visible ul {
    @apply block;
}

nav ul ul li {
    @apply px-0;
}

nav ul ul a {
    @apply block px-4 py-2 bg-white text-brown transition-colors duration-200 border-0;
}

nav ul ul a:hover {
    @apply bg-brown text-white transition-colors duration-200;
}
</style>

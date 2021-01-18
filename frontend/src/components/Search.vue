<template>
    <a class="cursor-pointer search whitespace-nowrap" :class="{ 'search-visible': searchVisible }">
        <font-awesome-icon :icon="['far', 'search']" v-on:click="toggleSearch"></font-awesome-icon>
        <form v-on:submit.prevent="search">
            <label for="search" class="sr-only">Suche:</label>
            <input type="search" class="w-full" name="search" id="search" placeholder="Suche..." autocomplete="off" v-model="searchTerm">
        </form>
    </a>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
    name: 'Search',
    data () {
        return {
            searchVisible: false,
            searchTerm: '',
        }
    },
    methods: {
        toggleSearch () {
            this.searchVisible = !this.searchVisible

            // Focus search input
            if (this.searchVisible) {
                const input = this.$el.querySelector('input')
                this.$nextTick(function () {
                    input.focus()
                })
            }
        },
        search () {
            const that = this

            if (this.searchTerm.length === 0) {
                return
            }

            that.$router.push({
                name: 'search',
                params: {
                    term: this.searchTerm
                },
            })
        }
    },
    directives: {
        ClickOutside
    },
}
</script>

<style scoped>
.search {
    @apply w-6;
}

.search input {
    @apply hidden py-1 text-sm;
}

.search-visible {
    @apply w-64 flex flex-row;
}

.search.search-visible input {
    @apply inline-block;
}

.search-visible svg {
    @apply mr-2;

    margin-top: .4rem;
}
</style>

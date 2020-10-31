<template>
    <div class="relative">
        <transition name="fade">
            <Button v-show="!showFilter" v-on:click.native="showFilter = !showFilter"
                    :classes="['absolute', 'w-20', 'right-0']">
                Filter
                <font-awesome-icon :icon="['far', 'filter']"></font-awesome-icon>
            </Button>
        </transition>

        <transition name="fade">
            <div class="bg-white w-64 p-3 absolute right-0 shadow" v-show="showFilter">
                <div class="flex justify-between border-b border-gray pb-2 px-2 mb-2">
                    <div>
                        <font-awesome-icon :icon="['far', 'filter']"></font-awesome-icon>
                        <span class="uppercase text-lg pl-2">Filter</span>
                    </div>
                    <div v-on:click="showFilter = false" class="cursor-pointer hover:text-gray-darker">
                        <font-awesome-icon :icon="['far', 'times']" size="lg"></font-awesome-icon>
                    </div>
                </div>

                <ListFilterSearch
                    name="sender"
                    placeholder="Absender..."
                    title="Absender"
                    :autocomplete-items="$store.getters.senders"
                    :classes="'z-40'">
                </ListFilterSearch>
                <div class="my-2 border-b border-gray-light"></div>
                <ListFilterSearch
                    name="receiver"
                    placeholder="Empfänger..."
                    title="Empfänger"
                    :autocomplete-items="$store.getters.receivers"
                    :classes="'z-30'">
                </ListFilterSearch>
                <div class="my-2 border-b border-gray-light"></div>
                <ListFilterSearch
                    name="place"
                    placeholder="Schreibort..."
                    title="Schreibort"
                    :autocomplete-items="$store.getters.places"
                    :classes="'z-20'">
                </ListFilterSearch>
                <div class="my-2 border-b border-gray-light"></div>
                <ListFilterSearch
                    name="doctype"
                    placeholder="Typ..."
                    title="Typ"
                    :autocomplete-items="$store.getters.doctypes"
                    :classes="'z-10'">
                </ListFilterSearch>
            </div>
        </transition>
    </div>
</template>

<script>
import Button from './../Button'
import ListFilterSearch from './ListFilterSearch'

export default {
    name: 'ListFilter',
    components: {
        ListFilterSearch,
        Button
    },
    data () {
        return {
            showFilter: false
        }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    @apply transition-opacity duration-200;
}

.fade-enter, .fade-leave-to {
    @apply opacity-0;
}
</style>

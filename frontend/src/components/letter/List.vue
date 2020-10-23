<template>
    <div>
        <div class="flex flex-col">
            <div class="flex lg:flex-row justify-between">
                <h2>Übersicht aller Briefe</h2>

                <div>
                    <ListFilter v-if="$store.state.loaded"></ListFilter>
                </div>
            </div>

            <div class="flex-1 max-h-screen overflow-y-auto">
                <table class="font-medium w-full">
                    <thead>
                    <tr>
                        <th>Nr</th>
                        <th>Von</th>
                        <th>An</th>
                        <th>Datum</th>
                        <th>Ort</th>
                        <th>Typ</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="letter in $store.getters.filterdLetters" :key="letter.number" @click="goToLetter(letter)">
                        <td v-text="letter.number"></td>
                        <td v-text="letter.sent.person.name"></td>
                        <td v-text="letter.received.person.name"></td>
                        <td class="cell-muted" v-text="formatDate(letter.date)"></td>
                        <td class="cell-muted" v-text="letter.sent.place.name"></td>
                        <td class="cell-muted" v-text="letter.doctypeName"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

import ListFilter from './ListFilter'

export default {
    name: 'LetterList',
    components: {
        ListFilter
    },
    mounted () {
        console.debug('Mounted Letter/List')
    },
    methods: {
        goToLetter (letter) {
            this.$router.push({
                name: 'letter',
                params: {
                    number: letter.number
                }
            })
        },
        formatDate (date) {
            return moment(date).format('DD.MM.YYYY')
        }
    }
}
</script>

<style scoped>
tr {
    @apply border-b border-gray-light;
}

th {
    @apply text-gray-dark font-medium p-2 text-left;
}

th,
td {
    @apply px-5 py-3;
}

tbody tr {
    @apply cursor-pointer;
}

tbody tr:hover {
    @apply bg-gray-lighter;
}

.cell-muted {
    @apply text-sm text-gray-dark;
}
</style>

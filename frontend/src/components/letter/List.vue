<template>
    <div class="flex flex-col">
        <div class="flex lg:flex-row justify-between">
            <h2>Übersicht aller Briefe</h2>

            <div>
                <ListFilter v-if="$store.state.loaded"></ListFilter>
            </div>
        </div>

        <Loading :loading="!$store.state.loaded">
            <div class="flex-1 max-h-screen overflow-y-auto">
                <table class="font-medium w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Personen</th>
                        <th>Orte</th>
                        <th>Typ</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="letter in $store.getters.filterdLetters" :key="letter.number" @click="goToLetter(letter)">
                        <td>
                            <span class="cell-muted" v-text="letter.number"></span><br>
                            {{ formatDate(letter.date) }}
                        </td>
                        <td>
                            {{ letter.sent.person.name }} <span class="relative" style="top: 1px"><font-awesome-icon :icon="['far', 'angle-right']"></font-awesome-icon></span><br>
                            {{ letter.received.person.name }}
                        </td>
                        <td class="cell-muted">
                            {{ letter.sent.place.name }} <span class="relative" style="top: 1px"><font-awesome-icon :icon="['far', 'angle-right']"></font-awesome-icon></span><br>
                            {{ letter.received.place.name }}
                        </td>
                        <td class="cell-muted" v-text="letter.doctypeName"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Loading>
    </div>
</template>

<script>
import moment from 'moment'

import ListFilter from './ListFilter'
import Loading from "./../Loading"

export default {
    name: 'LetterList',
    components: {
        Loading,
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
tbody tr {
    @apply cursor-pointer;
}
</style>

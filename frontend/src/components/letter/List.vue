<template>
    <div>
        <div class="flex flex-col">
            <div class="flex lg:flex-row justify-between">
                <h2>Übersicht aller Briefe</h2>

                <div>
                    <ListFilter v-if="$store.state.loaded" v-on:filter="applyFilter"></ListFilter>
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
                    <tr v-for="letter in letters" :key="letter.number" @click="goToLetter(letter)">
                        <td v-text="letter.number"></td>
                        <td v-text="personName(letter.sent.person.ref)"></td>
                        <td v-text="personName(letter.received.person.ref)"></td>
                        <td class="cell-muted" v-text="formatDate(letter.date)"></td>
                        <td class="cell-muted" v-text="placeName(letter.sent.place.ref)"></td>
                        <td class="cell-muted"></td>
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
    data () {
        return {
            filter: {
                sender: [],
                receiver: [],
                place: []
            }
        }
    },
    props: {
        lettersLocal: {
            type: Array,
            required: false,
            default: function () {
                return []
            }
        }
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
        applyFilter (filter) {
            console.log(filter)
            this.filter = filter
        },
        personName (id) {
            const person = this.$store.getters.getPersonById(id.replace('#', ''))

            if (person) {
                return person.name
            } else {
                return 'Unbekannt'
            }
        },
        placeName (id) {
            const place = this.$store.getters.getPlaceById(id.replace('#', ''))

            if (place) {
                return place.name
            } else {
                return 'Unbekannt'
            }
        },
        formatDate (date) {
            return moment(date).format('DD.MM.YYYY')
        }
    },
    computed: {
        letters () {
            // Check if the given letters should be used
            if (this.lettersLocal.length > 0) {
                return this.lettersLocal
            }

            // Otherwise take data from store
            return this.$store.getters.filterLetters(this.filter)
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

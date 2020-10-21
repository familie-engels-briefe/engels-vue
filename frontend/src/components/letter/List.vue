<template>
    <div>
        <div class="flex flex-col">
            <div class="flex lg:flex-row justify-between">
                <h2>Übersicht aller Briefe</h2>

                <div>
                    <ListFilter></ListFilter>
                </div>
            </div>

            <Loading :loading="loading">
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
                            <td v-text="letter.sent.person.ref"></td>
                            <td v-text="letter.received.person.ref"></td>
                            <td class="cell-muted" v-text="letter.date"></td>
                            <td class="cell-muted" v-text="letter.sent.place.ref"></td>
                            <td class="cell-muted"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Loading>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import ListFilter from './ListFilter'
import Loading from './../Loading'

export default {
    name: 'LetterList',
    components: {
        ListFilter,
        Loading
    },
    data () {
        return {
            letters: [],
            loading: true
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
    created () {
        // Check if the given letters should be used
        if (this.lettersLocal.length > 0) {
            this.letters = this.lettersLocal
            this.loading = false
            return
        }

        // Otherwise fetch letters from the api
        let that = this

        axios.get(this.createApiUrl('letters'))
            .then(function (response) {
                that.letters = response.data.data.letter
            })
            .catch(function (err) {
                that.displayAxiosError(err)
            })
            .then(function () {
                that.loading = false
            })
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

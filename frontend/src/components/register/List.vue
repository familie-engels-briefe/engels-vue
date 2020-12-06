<template>
    <div>
        <h2>Register</h2>

        <Loading :loading="!$store.state.loaded">
            <div class="mb-4">
                <label for="filter" class="hidden">Filter:</label>
                <input type="search" name="filter" id="filter" v-model="filter" placeholder="Filter nach Name">
            </div>

            <div class="flex-1 max-h-screen overflow-y-auto">
                <table class="font-medium w-full">
                    <thead>
                    <tr>
                        <th>Typ</th>
                        <th>Name</th>
                        <th>Briefe</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="person in filteredPersons" :key="person['xml:id']" :data-id="person['xml:id']">
                        <td title="Person">
                            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
                        </td>
                        <td>
                            <router-link :to="{ name: 'register.person', params: { id: person['xml:id'] } }" v-text="person.name"></router-link>
                        </td>
                        <td>
                            <a v-for="letter in person.letters" :key="letter" class="backlink" @click="goToLetter(letter)">
                                {{ letter }}
                            </a>
                        </td>
                    </tr>
                    <tr v-for="place in filteredPlaces" :key="place['xml:id']" :data-id="place['xml:id']">
                        <td title="Ort">
                            <font-awesome-icon :icon="['far', 'globe-stand']"></font-awesome-icon>
                        </td>
                        <td>
                            <router-link :to="{ name: 'register.place', params: { id: place['xml:id'] } }" v-text="place.name"></router-link>
                        </td>
                        <td>
                            <a v-for="letter in place.letters" :key="letter" class="backlink" @click="goToLetter(letter)">
                                {{ letter }}
                            </a>
                        </td>
                    </tr>
                    <tr v-for="org in filteredOrganisations" :key="org['xml:id']" :data-id="org['xml:id']">
                        <td title="Organisation">
                            <font-awesome-icon :icon="['far', 'building']"></font-awesome-icon>
                        </td>
                        <td>
                            <router-link :to="{ name: 'register.org', params: { id: org['xml:id'] } }" v-text="org.name"></router-link>
                        </td>
                        <td>
                            <a v-for="letter in org.letters" :key="letter" class="backlink" @click="goToLetter(letter)">
                                {{ letter }}
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Loading>
    </div>
</template>

<script>
import Loading from './../Loading'

export default {
    name: 'RegisterList',
    components: {
        Loading
    },
    data () {
        return {
            filter: ''
        }
    },
    methods: {
        mounted () {
            console.debug ('Mounted Register/list')
        },
        goToLetter (letter) {
            this.$router.push({
                name: 'letter',
                params: {
                    number: letter.replace('fe', '')
                }
            })
        },
    },
    computed: {
        filteredPersons () {
            const that = this

            if (this.filter.length === 0) {
                return this.$store.state.persons
            }

            return this.$store.state.persons.filter(function (person) {
                return person.name.includes(that.filter)
            })
        },
        filteredPlaces () {
            const that = this

            if (this.filter.length === 0) {
                return this.$store.state.places
            }

            return this.$store.state.places.filter(function (place) {
                return place.name.includes(that.filter)
            })
        },
        filteredOrganisations () {
            const that = this

            if (this.filter.length === 0) {
                return this.$store.state.organisations
            }

            return this.$store.state.organisations.filter(function (organisation) {
                return organisation.name.includes(that.filter)
            })
        }
    }
}
</script>

<style scoped>
.backlink {
    @apply inline-block py-1 px-2 my-1 mx-1 transition-colors duration-200;
}
.backlink:hover {
    @apply cursor-pointer bg-gray-darker text-white transition-colors;
}
</style>

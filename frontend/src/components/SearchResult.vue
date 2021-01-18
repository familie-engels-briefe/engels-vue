<template>
    <div>
        <h2>Suche nach "{{ term }}"</h2>

        <Loading :loading="finished === false">
            <template v-if="results.length > 0">
                <div v-for="result in results" class="mb-8" :key="result.number">
                    <h3><router-link :to="{ name: 'letter', params: { number: result.number }}"><strong v-text="result.letter.numberPublic"></strong> {{ result.title }}</router-link></h3>
                    <div v-html="result.norm"></div>
                </div>
            </template>
            <div v-else class="bg-yellow-100 text-yellow-900 font-bold p-4 border-l-4 border-yellow-900">
                Zu dem Suchbegriff "{{ term }}" konnten wir leider nichts in unseren Daten finden. Versuche Sie es bitte mit einem anderen Begriff noch einmal.
            </div>
        </Loading>
    </div>
</template>

<script>
import axios from 'axios'

import Loading from './Loading'

export default {
    name: 'SearchResult',
    components: {
        Loading
    },
    props: {
        term: {
            type: String,
            required: true,
        },
    },
    data () {
        return {
            finished: false,
            results: [],
        }
    },
    mounted () {
        console.debug('Mounted SearchResult')

        this.search()
    },
    methods: {
        search () {
            const that = this
            this.finished = false

            axios.get(this.createApiUrl('search/' + encodeURIComponent(this.term)))
                .then(function (response) {
                    that.results = []

                    for (let i = 0; i < response.data.results.length; i++) {
                        let result = response.data.results[i]
                        result.letter = that.$store.getters.getLetterByRef(result.number)

                        that.results.push(result)
                    }
                })
                .catch(function (err) {
                    that.displayAxiosError(err)
                })
                .then(function () {
                    that.finished = true
                })
        },
    },
    watch: {
        term () {
            this.search()
        },
    },
}
</script>

<style scoped>

</style>

<template>
    <div class="register-detail-person">
        <RegisterDetail :id="id" :title="title" :content="content" :urls="urls" :image="image"></RegisterDetail>
    </div>
</template>

<script>
import RegisterDetail from './Detail'
import axios from 'axios'

export default {
    name: 'RegisterPerson',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data () {
        return {
            title: '',
            content: null,
            image: null,
            urls: [],
        }
    },
    components: {
        RegisterDetail
    },
    mounted () {
        const person = this.$store.getters.getPersonByRef(this.id)

        console.debug('Loading details for', person)

        if (person && person.idno && person.idno['#text']) {
            this.title = person.name

            if (person.idno.type.toLowerCase() === 'gnd') {
                this.parseGND(person.idno['#text'])
            } else {
                console.error('Not implemented person provider', person.idno)
            }
        } else {
            this.content = `<strong>Für die Person existieren keine weiteren Details.</strong>`
        }
    },
    methods: {
        parseGND (id) {
            const that = this
            const url = 'https://lobid.org/gnd/' + id + '.json'

            axios.get(url)
                .then(function (response) {
                    if (response.data.depiction && response.data.depiction.length > 0) {
                        that.image = response.data.depiction[0]
                    }

                    that.urls.push({
                        key: 'gnd',
                        title: 'GND',
                        href: 'http://d-nb.info/gnd/' + id
                    })

                    that.content = ''

                    console.debug('Loaded details for ' + that.id + ' from lobid.org')
                })
                .catch(function () {
                    that.$store.commit('setError', {
                        message: 'Es konnten keine weiteren Details zur Person geladen werden! Bitte versuchen Sie es später noch einmal.'
                    })
                    that.content = ''
                })
        }
    },
}
</script>

<style scoped>

</style>

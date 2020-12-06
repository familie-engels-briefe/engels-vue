<template>
    <div class="register-detail-place">
        <RegisterDetail :id="id"
                        :title="title"
                        :content="content"
                        :urls="urls"
                        :image="image"></RegisterDetail>
    </div>
</template>

<script>
import RegisterDetail from './Detail'
import axios from 'axios'

export default {
    name: 'RegisterPlace',
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
        const that = this
        const place = this.$store.getters.getPlaceByRef(this.id)

        this.title = place.name

        console.debug('Loading details for', place)

        if (place.idno) {
            if (Array.isArray(place.idno) && place.idno.length > 0) {
                place.idno.forEach(function (idno) {
                    if (idno.type.toLowerCase() === 'gnd') {
                        that.parseGND(idno['#text'])
                    }
                })
            } else if (place.idno.type.toLowerCase() === 'gnd') {
                that.parseGND(place.idno['#text'])
            } else {
                console.error('Not implemented place provider', place.idno)
            }
        } else {
            this.content = `<strong>Für diesen Ort existieren keine weiteren Details.</strong>`
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
                        message: 'Es konnten keine weiteren Details zu dem Ort geladen werden! Bitte versuchen Sie es später noch einmal.'
                    })
                    that.content = ''
                })
        }
    },
}
</script>

<style scoped>

</style>

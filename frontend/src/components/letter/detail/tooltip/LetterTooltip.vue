<template>
    <span>
        <Tooltip :content="letterTitle" v-on:click="console.log('Test')" v-on:click.native="goToLetter" :classes="'cursor-pointer'"><slot></slot></Tooltip>
    </span>
</template>

<script>
import Tooltip from '../../../Tooltip'
import moment from 'moment'

export default {
    name: 'LetterTooltip',
    components: {
        Tooltip
    },
    props: {
        letter: {
            type: Object,
            required: true
        }
    },
    computed: {
        letterTitle () {
            if (!this.letter || !this.letter.received) {
                return 'Unbekannt'
            }

            const received = this.$store.getters.getPersonByRef(this.letter.received.person.ref)
            const sent = this.$store.getters.getPersonByRef(this.letter.sent.person.ref)
            const date = moment(this.letter.date)

            return 'Brief von ' + (received ? received.name : 'Unbekannt') + ' an ' + (sent ? sent.name : 'Unbekannt') + ' (' + date.format('DD.MM.YYYY') + ')'
        }
    },
    methods: {
        goToLetter () {
            this.$router.push({
                name: 'letter',
                params: {
                    number: this.letter.number
                }
            }, function () {
                console.log('Changed')
            }, function (err) {
                console.error(err)
            })
        }
    }
}
</script>

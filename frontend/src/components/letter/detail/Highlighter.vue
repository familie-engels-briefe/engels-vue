<template>
    <div class="relative w-40">
        <transition name="fade">
            <Button v-show="!showHighlighter" v-on:click.native="showHighlighter = !showHighlighter"
                    :classes="['absolute', 'right-0']">
                Hervorhebungen&nbsp;<font-awesome-icon :icon="['far', 'highlighter']"></font-awesome-icon>
            </Button>
        </transition>

        <transition name="fade">
            <div class="bg-white w-72 p-3 absolute right-0 shadow" v-show="showHighlighter">
                <div class="flex justify-between border-b border-gray pb-2 px-2 mb-2">
                    <div>
                        <font-awesome-icon :icon="['far', 'highlighter']"></font-awesome-icon>
                        <span class="uppercase text-lg pl-2">Hervorhebungen</span>
                    </div>
                    <div v-on:click="showHighlighter = false" class="cursor-pointer hover:text-gray-darker" style="margin-top: .15rem">
                        <font-awesome-icon :icon="['far', 'times']" size="lg"></font-awesome-icon>
                    </div>
                </div>

                <HighlighterSearch
                    name="topics"
                    title="Thema"
                    :items="topicsWithNames"
                    :classes="'z-40'"
                    v-on:update-items="updateHighlighter">
                </HighlighterSearch>
            </div>
        </transition>
    </div>
</template>

<script>
import Button from '../../Button'
import HighlighterSearch from './HighlighterSearch'

export default {
    name: 'LetterHighlighter',
    components: {
        Button,
        HighlighterSearch,
    },
    props: {
        html: {
            required: false,
            type: String,
            default () {
                return '<div></div>'
            }
        }
    },
    data () {
        return {
            showHighlighter: false,
            node: null,
            topics: [],
            persons: [],
            places: [],
            organisations: [],
            letters: [],
            dates: [],
            comments: [],
            selected: {
                topics: [],
                persons: [],
                places: [],
                organisations: [],
                letters: [],
                dates: [],
                comments: [],
            },
        }
    },
    mounted () {
        console.debug('Mounted Letter/Detail/Highlighter')

        this.node = document.createElement('div')
        this.node.innerHTML = this.html

        this.getTopicsFromLetter()
    },
    computed: {
        topicsWithNames () {
            const topics = {
                'W': 'Wirtschaft',
                'R': 'Religion',
                'P': 'Politik',
                'G': 'Gesundheit/Krankheit',
                'E': 'Erziehung',
                'K': 'Kultur (Literatur/Musik)',
                'EB': 'Stadtgeschichte: Barmen/Elberfeld',
                'H': 'Engels-Haus',
                'M': 'Reisen/Geschäftsreisen',
                'F': 'Geschichte der Manufaktur',
                'B': 'Bibelzitate',
                'L': 'Liebe/Ehe',
                'KR': 'Krieg',
                'J': 'Jüdisches Leben und Antisemitismus',
                'FEG': 'Friedrich Engels jr. - Geburt',
                'FEK': 'Friedrich Engels jr. - Kindheit',
                'FEJ': 'Friedrich Engels jr. - Jugend',
                'FEM': 'Friedrich Engels jr. - Aufenthalt in Manchester',
            }

            return this.topics.map(function (topic) {
                return {
                    id: topic,
                    name: topics[topic] ? topics[topic] : topic
                }
            })
        }
    },
    methods: {
        getTopicsFromLetter () {
            this.topics = [...new Set(Array.from(this.node.querySelectorAll('.engels_topic'))
                .map(function (topic) {
                    return topic.getAttribute('data-type')
                }))]
        },
        updateHighlighter (event) {
            this.selected[event.name] = event.items

            this.$emit('update-highlights', {
                selected: this.selected
            })
        }
    },
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

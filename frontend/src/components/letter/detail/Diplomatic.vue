<template>
    <div>
        <div :is="processedHtml" class="letter letter-diplomatic"></div>
    </div>
</template>

<script>
import Person from './Person'

export default {
    name: 'LetterDiplomatic',
    props: {
        html: {
            type: String,
            required: true
        }
    },
    mounted () {
        console.debug('Mounted Letter/Detail/Diplomatic')
    },
    computed: {
        processedHtml () {
            const that = this
            const wrapper = document.createElement('div')
            wrapper.innerHTML = this.html

            // Replace persons with correcesponding components
            Array.from(wrapper.querySelectorAll('.tei_persName')).forEach(function (person) {
                const personNode = document.createElement('component')
                personNode.setAttribute('is', 'Person')
                personNode.setAttribute(':person', JSON.stringify(that.$store.getters.getPersonByRef(person.getAttribute('data-ref')) || {}))
                personNode.innerHTML = person.innerHTML

                person.replaceWith(personNode)
            })

            Array.from(wrapper.querySelectorAll('.tei_rs[data-type="person"]')).forEach(function (person) {
                const personNode = document.createElement('component')
                personNode.setAttribute('is', 'Person')
                personNode.setAttribute(':person', JSON.stringify(that.$store.getters.getPersonByRef(person.getAttribute('data-ref')) || {}))
                personNode.innerHTML = person.innerHTML

                person.replaceWith(personNode)
            })

            // Replace uncertain text with element with highest certainty
            Array.from(wrapper.querySelectorAll('.tei_choice')).forEach(function (choice) {
                const unclears = Array.from(choice.querySelectorAll('.tei_unclear'))

                if (unclears.length <= 0) {
                    return
                }

                // Hide all choices by default
                choice.querySelectorAll('.tei_unclear').forEach(function (unclear) {
                    unclear.classList.add('hidden')
                })

                // Show in order if they exist
                if (choice.querySelectorAll('.tei_unclear[data-cert="high"]').length > 0) {
                    choice.querySelector('.tei_unclear[data-cert="high"]').classList.remove('hidden')
                    return
                }

                if (choice.querySelectorAll('.tei_unclear[data-cert="medium"]').length > 0) {
                    choice.querySelector('.tei_unclear[data-cert="medium"]').classList.remove('hidden')
                    return
                }

                choice.querySelector('.tei_unclear').classList.remove('hidden')
            })

            // Replace damaged text with placeholder
            Array.from(wrapper.querySelectorAll('.tei_damage .tei_supplied[data-reason="siegelausriss"]')).forEach(function (damage) {
                damage.innerHTML = 'Textverlust'
            })

            return {
                template: wrapper.outerHTML,
                components: {
                    Person
                },
                data () {
                    return {
                        Person
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
/**
 * Simple formatting
 */
.letter-diplomatic {
    @apply font-letter-serif;
}

/deep/ [data-rendition="#g.rend.script.latin"] {
    @apply font-letter-sans;
}

/deep/ .tei_hi[data-rend*="underline"],
/deep/ .engels_hiSic .engels_hiIntended[data-rend*="underline"] {
    @apply underline;
}

/deep/ .tei_hi[data-rend="spacing"] {
    @apply tracking-widest;
}

/deep/ [data-rend*="sup"] {
    vertical-align: super;
}

/deep/ [data-rend*="sub"] {
    vertical-align: sub;
}

/deep/ .tooltip-button {
    @apply border-b border-dashed border-gray;
}

/**
 * Choice
 */
/deep/ .tei_choice .tei_corr {
    @apply hidden;
}

/deep/ .tei_choice .tei_expan {
    @apply hidden;
}

/deep/ .tei_choice .ed {
    @apply hidden;
}

/**
 * Missing / added content
 */

/deep/ .tei_unclear {
    @apply text-gray;
}

/deep/ .tei_subst .ed {
    @apply italic;
}

/deep/ .tei_add {
    @apply font-bold;
}

/deep/ .tei_damage .tei_supplied[data-reason="damage"]:before {
    content: '{';
}
/deep/ .tei_damage .tei_supplied[data-reason="damage"]:after {
    content: '}';
}
</style>

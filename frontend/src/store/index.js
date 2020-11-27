import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { getPersonName } from './persons'
import { getPlaceName } from './places'
import { getOrganisationName } from './organisations'

Vue.use(Vuex)

/**
 * @param {String|Array} note
 * @returns {Array}
 */
function getBacklinksFromNote (note) {
    if (Array.isArray(note)) {
        note = note.map(function (noteText) {
            return noteText.replace('\n', '').trim()
        }).join(',')
    }

    return note.split(',').map(function (backlink) {
        return backlink.trim()
    })
}

/**
 * @param {object} element
 * @returns {[]}
 */
function getBacklinks (element) {
    if (!element.note) {
        return []
    }

    if (typeof element.note === 'object' && element.note['#text']) {
        return getBacklinksFromNote(element.note['#text'])
    }

    if (Array.isArray(element.note)) {
        const backlinks = element.note.filter(function (note) {
            return note.type === 'backlinks'
        })

        if (backlinks.length > 0 && backlinks[0]['#text']) {
            return getBacklinksFromNote(backlinks[0]['#text'])
        }
    }

    console.error('Could not read backlinks from', element)

    return []
}

function getBacklinsFiltered (element) {
    return getBacklinks(element).filter(function (backlink) {
        return backlink.trim() !== ''
    })
}

const store = new Vuex.Store({
    state: {
        loaded: false,
        letters: [],
        organisations: [],
        persons: [],
        places: [],
        doctypes: [],
        filter: {
            sender: [],
            receiver: [],
            place: [],
            doctype: []
        },
        organisationDictionary: {},
        personDictionary: {},
        placeDictionary: {},
        letterDictionary: {},
        doctypesDictionary: {
            'letter': 'Brief'
        }
    },
    getters: {
        senders (state) {
            return _.uniqBy(state.letters.map(function (letter) {
                return {
                    id: letter.sent.person.ref.replace('#', ''),
                    text: letter.sent.person.name,
                }
            }), 'id')
        },
        receivers (state) {
            return _.uniqBy(state.letters.map(function (letter) {
                return {
                    id: letter.received.person.ref.replace('#', ''),
                    text: letter.received.person.name,
                }
            }), 'id')
        },
        places (state) {
            return _.uniqBy(state.letters.map(function (letter) {
                return {
                    id: letter.sent.place.ref.replace('#', ''),
                    text: letter.sent.place.name,
                }
            }), 'id')
        },
        doctypes (state) {
            return Object.keys(state.doctypesDictionary).map(function (id) {
                return {
                    id: id,
                    text: state.doctypesDictionary[id]
                }
            })
        },
        filterdLetters (state) {
            let letters = state.letters

            let filteredLetters = []

            const senders = state.filter.sender.map(function (sender) {
                return '#' + sender.id
            })

            const receivers = state.filter.receiver.map(function (receiver) {
                return '#' + receiver.id
            })

            const places = state.filter.place.map(function (place) {
                return '#' + place.id
            })

            const doctypes = state.filter.doctype.map(function (doctype) {
                return doctype.id
            })

            filteredLetters = []
            if (senders.length) {
                for (let i = 0; i < senders.length; i++) {
                    filteredLetters.push(...state.letters.filter(function (letter) {
                        return senders.indexOf(letter.sent.person.ref) !== -1
                    }))
                }
            } else {
                filteredLetters.push(...state.letters)
            }
            letters = _.uniqBy(filteredLetters, 'number')

            filteredLetters = []
            if (receivers.length) {
                for (let i = 0; i < receivers.length; i++) {
                    filteredLetters.push(...letters.filter(function (letter) {
                        return receivers.indexOf(letter.received.person.ref) !== -1
                    }))
                }
            } else {
                filteredLetters.push(...letters)
            }
            letters = _.uniqBy(filteredLetters, 'number')

            filteredLetters = []
            if (places.length) {
                for (let i = 0; i < places.length; i++) {
                    filteredLetters.push(...letters.filter(function (letter) {
                        return places.indexOf(letter.sent.place.ref) !== -1
                    }))
                }
            } else {
                filteredLetters.push(...letters)
            }
            letters = _.uniqBy(filteredLetters, 'number')

            filteredLetters = []
            if (doctypes.length) {
                for (let i = 0; i < doctypes.length; i++) {
                    filteredLetters.push(...letters.filter(function (letter) {
                        return typeof state.doctypesDictionary[letter.doctype] !== 'undefined'
                    }))
                }
            } else {
                filteredLetters.push(...letters)
            }
            letters = _.uniqBy(filteredLetters, 'number')

            return letters
        },
        getPersonByRef(state) {
            return function (ref) {
                ref = ref.replace('#', '')
                return state.personDictionary[ref] || null
            }
        },
        getPlaceByRef(state) {
            return function (ref) {
                ref = ref.replace('#', '')
                return state.placeDictionary[ref] || null
            }
        },
        getOrganisationByRef(state) {
            return function (ref) {
                ref = ref.replace('#', '')
                return state.organisationDictionary[ref] || null
            }
        },
        getLetterByRef(state) {
            return function (ref) {
                ref = ref
                    .replace('#', '')
                    .replace('fe.', '')
                return state.letterDictionary[ref] || null
            }
        },
    },
    mutations: {
        setLoaded (state, force) {
            let loaded

            if (!force) {
                loaded = (state.letters.length > 0 &&
                    state.organisations.length > 0 &&
                    state.persons.length > 0 &&
                    state.places.length > 0)
            } else {
                loaded = true
            }

            if (loaded) {
                // When all data is loaded

                // Get unique doctypes from letters
                state.doctypes.push(..._.uniq(state.letters.map(function (letter) {
                    return letter.doctype
                })))

                // Create dictionaries for faster access
                const orgDict = {}
                const persDict = {}
                const placeDict = {}
                const letterDict = {}

                for (let i = 0; i < state.organisations.length; i++) {
                    orgDict[state.organisations[i]['xml:id']] = state.organisations[i]
                }
                Vue.set(state, 'organisationDictionary', orgDict)

                for (let i = 0; i < state.persons.length; i++) {
                    persDict[state.persons[i]['xml:id']] = state.persons[i]
                }
                Vue.set(state, 'personDictionary', persDict)

                for (let i = 0; i < state.places.length; i++) {
                    placeDict[state.places[i]['xml:id']] = state.places[i]
                }
                Vue.set(state, 'placeDictionary', placeDict)

                for (let i = 0; i < state.letters.length; i++) {
                    letterDict[state.letters[i]['number']] = state.letters[i]
                }
                Vue.set(state, 'letterDictionary', letterDict)

                const letters = []

                // Set additional details for each letter
                for (let i = 0; i < state.letters.length; i++) {
                    const letter = state.letters[i]

                    // Set sender name
                    const personSend = state.personDictionary[state.letters[i].sent.person.ref.replace('#', '')] || {
                        'name': 'Unbekannt'
                    }
                    letter.sent.person.name = personSend.name

                    // Set receiver name
                    const personReceived = state.personDictionary[state.letters[i].received.person.ref.replace('#', '')] || {
                        'name': 'Unbekannt'
                    }
                    letter.received.person.name = personReceived.name

                    // Set sender place
                    const placeSend = state.placeDictionary[state.letters[i].sent.place.ref.replace('#', '')] || {
                        'name': 'Unbekannt'
                    }
                    letter.sent.place.name = placeSend.name

                    // Set receiver place
                    const placeReceived = state.placeDictionary[state.letters[i].received.place.ref.replace('#', '')] || {
                        'name': 'Unbekannt'
                    }
                    letter.received.place.name = placeReceived.name

                    // Set doctype
                    letter.doctypeName = state.doctypesDictionary[state.letters[i].doctype] || 'Unbekannt'

                    letters.push(letter)
                }

                Vue.set(state, 'letters', letters)
            } else {
                console.warn('Not all data loaded yet!')
            }

            state.loaded = loaded
        },
        setLetters (state, letters) {
            state.letters.push(...letters)
        },
        setOrganisations (state, organisations) {
            organisations = organisations.map(function (organisation) {
                organisation.name = getOrganisationName(organisation) ?? 'Unbekannt'
                organisation.letters = getBacklinsFiltered(organisation) ?? []

                return organisation
            })

            state.organisations.push(...organisations)
        },
        setPersons (state, persons) {
            persons = persons.map(function (person) {
                person.name = getPersonName(person) ?? 'Unbekannt'
                person.letters = getBacklinsFiltered(person) ?? []

                return person
            })

            state.persons.push(...persons)
        },
        setPlaces (state, places) {
            places = places.map(function (place) {
                place.name = getPlaceName(place) ?? 'Unbekannt'
                place.letters = getBacklinsFiltered(place) ?? []

                return place
            })

            state.places.push(...places)
        },
        /**
         *
         * @param state
         * @param {Object} payload
         * @param {string} payload.type
         * @param {Array} payload.tags
         */
        updateFilter (state, payload) {
            Vue.set(state.filter, payload.type, payload.tags)
        }
    }
})

export default store

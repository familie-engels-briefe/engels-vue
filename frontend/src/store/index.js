import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getPersonName, getAutocompletePersons } from './persons'
import { getPlaceName, getAutocompletePlaces } from './places'

const store = new Vuex.Store({
    state: {
        loaded: false,
        letters: [],
        organisations: [],
        persons: [],
        places: []
    },
    getters: {
        getPersonById (state) {
            return function (id) {
                return state.persons.find(function (person) {
                    return person['xml:id'] === id
                })
            }
        },
        getPlaceById (state) {
            return function (id) {
                return state.places.find(function (place) {
                    return place['xml:id'] === id
                })
            }
        },
        autocompletePersons (state) {
            return getAutocompletePersons(state)
        },
        autocompletePlaces (state) {
            return getAutocompletePlaces(state)
        },
        filterLetters (state) {
            /**
             * @param {Object} filter
             * @property {string} filter.sender #ref
             * @property {string} filter.receiver #ref
             * @property {string} filter.place #ref
             */
            return function (filter) {
                let letters = state.letters

                const senders = filter.sender.map(function (sender) {
                    return '#' + sender.id
                })

                const receivers = filter.receiver.map(function (receiver) {
                    return '#' + receiver.id
                })

                const places = filter.place.map(function (place) {
                    return '#' + place.id
                })

                if (filter.sender.length > 0) {
                    letters = letters.filter(function (letter) {
                        return senders.indexOf(letter.sent.person.ref) !== -1
                    })
                }

                if (filter.receiver.length > 0) {
                    letters = letters.filter(function (letter) {
                        return receivers.indexOf(letter.received.person.ref) !== -1
                    })
                }

                if (filter.place.length > 0) {
                    letters = letters.filter(function (letter) {
                        return places.indexOf(letter.sent.place.ref) !== -1
                    })
                }

                return letters
            }
        }
    },
    mutations: {
        setLoaded (state) {
            state.loaded = (state.letters.length > 0 &&
                state.organisations.length > 0 &&
                state.persons.length > 0 &&
                state.places.length > 0)

            if (state.loaded) {
                console.debug('Data loaded')
            }
        },
        setLetters (state, letters) {
            state.letters = letters
        },
        setOrganisations (state, organisations) {
            state.organisations = organisations
        },
        setPersons (state, persons) {
            persons = persons.map(function (person) {
                person.name = getPersonName(person) ?? 'Unbekannt'

                return person
            })

            state.persons = persons
        },
        setPlaces (state, places) {
            places = places.map(function (place) {
                place.name = getPlaceName(place) ?? 'Unbekannt'

                return place
            })

            state.places = places
        },
    }
})

export default store

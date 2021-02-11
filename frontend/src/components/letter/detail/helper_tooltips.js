export function replacePersons(wrapper, store) {
    Array.from(wrapper.querySelectorAll('.tei_persName')).forEach(function (person) {
        const personNode = document.createElement('component')
        personNode.setAttribute('is', 'PersonTooltip')
        personNode.setAttribute(':person', JSON.stringify(store.getters.getPersonByRef(person.getAttribute('data-ref')) || {}))
        if (person.classList.contains('has-highlight')) {
            personNode.setAttribute(':has-highlight', '1')
        } else {
            personNode.removeAttribute(':has-highlight')
        }

        personNode.innerHTML = person.innerHTML

        person.replaceWith(personNode)
    })

    Array.from(wrapper.querySelectorAll('.tei_rs[data-type="person"]')).forEach(function (person) {
        const personNode = document.createElement('component')
        personNode.setAttribute('is', 'PersonTooltip')
        personNode.setAttribute(':person', JSON.stringify(store.getters.getPersonByRef(person.getAttribute('data-ref')) || {}))
        personNode.innerHTML = person.innerHTML

        person.replaceWith(personNode)
    })
}

export function replacePlaces(wrapper, store) {
    Array.from(wrapper.querySelectorAll('.tei_placeName')).forEach(function (place) {
        const placeNode = document.createElement('component')
        placeNode.setAttribute('is', 'PlaceTooltip')
        placeNode.setAttribute(':place', JSON.stringify(store.getters.getPlaceByRef(place.getAttribute('data-ref')) || {}))
        if (place.classList.contains('has-highlight')) {
            placeNode.setAttribute(':has-highlight', '1')
        } else {
            placeNode.removeAttribute(':has-highlight')
        }

        placeNode.innerHTML = place.innerHTML

        place.replaceWith(placeNode)
    })

    Array.from(wrapper.querySelectorAll('.tei_rs[data-type="place"]')).forEach(function (place) {
        const placeNode = document.createElement('component')
        placeNode.setAttribute('is', 'PlaceTooltip')
        placeNode.setAttribute(':place', JSON.stringify(store.getters.getPlaceByRef(place.getAttribute('data-ref')) || {}))
        placeNode.innerHTML = place.innerHTML

        place.replaceWith(placeNode)
    })
}

export function replaceOrganisations(wrapper, store) {
    Array.from(wrapper.querySelectorAll('.tei_orgName')).forEach(function (org) {
        const orgNode = document.createElement('component')
        orgNode.setAttribute('is', 'OrganisationTooltip')
        orgNode.setAttribute(':org', JSON.stringify(store.getters.getOrganisationByRef(org.getAttribute('data-ref')) || {}))
        if (org.classList.contains('has-highlight')) {
            orgNode.setAttribute(':has-highlight', '1')
        } else {
            orgNode.removeAttribute(':has-highlight')
        }

        orgNode.innerHTML = org.innerHTML

        org.replaceWith(orgNode)
    })

    Array.from(wrapper.querySelectorAll('.tei_rs[data-type="org"]')).forEach(function (org) {
        const orgNode = document.createElement('component')
        orgNode.setAttribute('is', 'OrganisationTooltip')
        orgNode.setAttribute(':org', JSON.stringify(store.getters.getOrganisationByRef(org.getAttribute('data-ref')) || {}))
        orgNode.innerHTML = org.innerHTML

        org.replaceWith(orgNode)
    })
}

export function replaceLetters(wrapper, store) {
    Array.from(wrapper.querySelectorAll('.tei_rs[data-type="letter"][data-ref]')).forEach(function (letter) {
        const letterNode = document.createElement('component')
        letterNode.setAttribute('is', 'LetterTooltip')
        letterNode.setAttribute(':letter', JSON.stringify(store.getters.getLetterByRef(letter.getAttribute('data-ref')) || {}))
        letterNode.innerHTML = letter.innerHTML

        letter.replaceWith(letterNode)
    })
}

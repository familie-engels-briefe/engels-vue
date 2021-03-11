export function replacePersons(wrapper, store, sent, received) {
    Array.from(wrapper.querySelectorAll('.tei_persName')).forEach(function (person) {
        const personNode = document.createElement('component')
        personNode.setAttribute('is', 'PersonTooltip')
        personNode.setAttribute(':person', JSON.stringify(store.getters.getPersonByRef(person.getAttribute('data-ref')) || {}))

        if (person.classList.contains('has-highlight') && person.getAttribute('data-ref') !== sent && person.getAttribute('data-ref') !== received) {
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

export function replaceSachkommentare(wrapper) {
    Array.from(wrapper.querySelectorAll('.tei_back .tei_div[data-type="com"] .tei_note')).forEach(function (note) {
        try {
            const id = note.querySelector('[data-from]')
                .getAttribute('data-from')
                .replace('#', '')
                .replace('.s', '')

            const contents = note.innerHTML
            const target = wrapper.querySelector('[data-annotId^="' + id + '"]')

            const sachkommentarNode = document.createElement('component')
            sachkommentarNode.setAttribute('is', 'SachkommentarTooltip')
            sachkommentarNode.setAttribute(':html', JSON.stringify(contents))
            if (target.classList.contains('has-highlight')) {
                sachkommentarNode.setAttribute(':has-highlight', '1')
            } else {
                sachkommentarNode.removeAttribute(':has-highlight')
            }

            sachkommentarNode.innerHTML = target.innerHTML

            target.replaceWith(sachkommentarNode)
        } catch (e) {
            console.error('Could not replace Sachkommentar:', e)
        }
    })
}

export function replaceTextkommentare(wrapper) {
    Array.from(wrapper.querySelectorAll('.tei_back .tei_div[data-type="txt"] .tei_note')).forEach(function (note) {
        try {
            const id = note.querySelector('[data-corresp]')
                .getAttribute('data-corresp')
                .replace('#', '')

            const contents = note.innerHTML
            const target = wrapper.querySelector('[data-annotid^="' + id + '"]')

            const textkommentarNode = document.createElement('component')
            textkommentarNode.setAttribute('is', 'TextkommentarTooltip')
            textkommentarNode.setAttribute(':html', JSON.stringify(contents))
            if (target.classList.contains('has-highlight')) {
                textkommentarNode.setAttribute(':has-highlight', '1')
            } else {
                textkommentarNode.removeAttribute(':has-highlight')
            }

            textkommentarNode.innerHTML = target.innerHTML

            target.replaceWith(textkommentarNode)
        } catch (e) {
            console.error('Could not replace Textkommentar:', e)
        }
    })
}

export function replaceNormalizations() {
    // TODO: Implement
}

/**
 * @param {Object} name
 * @returns {string}
 */
export const concatFullName = function (name) {
    if (!name.forename) {
        if (name.surname) {
            return name.surname
        }

        return null
    }

    let forename = Array.isArray(name.forename)
        ? name.forename.join(' ')
        : name.forename
    if (forename === null) {
        forename = ''
    }

    let surname = Array.isArray(name.surname)
        ? name.surname.join(' ')
        : name.surname
    if (surname === null) {
        surname = ''
    }

    if (typeof forename === 'object') {
        if (Array.isArray(forename['#text'])) {
            forename['#text'] = forename['#text'].join(' ').trim()
        }

        forename = (forename['#text'] + forename['am']).replace('\n', '').trim()
    }

    if (typeof surname === 'object') {
        if (!surname['#text']) {
            surname['#text'] = ''
        }
        if (!surname['am']) {
            surname['am'] = ''
        }

        surname = (surname['#text'] + surname['am']).replace('\n', '').trim()
    }

    let link = ''

    if (name.nameLink) {
        link = name.nameLink
    }

    return [forename, link, surname].join(' ').trim()
}

export const getPersonName = function (person) {
    if (!person['persName']) {
        console.warn('Person does not have a "persName" attribute', person)

        return null
    }

    try {
        const names = person['persName']

        if (typeof names === 'string') {
            return names
        }

        if (!Array.isArray(names)) {
            return concatFullName(person['persName'])
        }

        // Search for "reg" name
        const reg = names.find(function (name) {
            return name.type && name.type === 'reg'
        })

        if (!reg) {
            // If "reg" does not exist search for "full" name
            const full = names.find(function (name) {
                return name.type && name.type === 'full'
            })

            if (!full) {
                return concatFullName(names[0])
            }

            return concatFullName(full)
        }

        return concatFullName(reg)
    } catch (e) {
        console.error('Could not get name for', person, e)

        return null
    }
}

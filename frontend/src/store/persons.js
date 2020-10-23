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

    const forname = Array.isArray(name.forename)
        ? name.forename.join(' ')
        : name.forename
    const surname = name.surname

    return [forname, surname].join(' ')
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

export const getAutocompletePersons = function (state) {
    return state.persons.map(function (person) {
            return {
                id: person['xml:id'],
                text: person.name
            }
        })
}


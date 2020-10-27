/**
 * @param {object} organisation
 * @returns {string}
 */
export const getOrganisationName = function (organisation) {
    if (organisation.orgName) {
        if (typeof organisation.orgName === 'string') {
            return organisation.orgName
        } else if (typeof organisation.orgName === 'object') {
            if (organisation.orgName.surname) {
                return organisation.orgName.surname
            }

            if (Array.isArray(organisation.orgName['#text'])) {
                return organisation.orgName['#text'].join(' ')
            }

            return organisation.orgName['#text']
        }
    }

    console.error('Could not get organisation name from', organisation)

    return 'Unbekannt'
}

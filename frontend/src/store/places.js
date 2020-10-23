export const getPlaceName = function (place) {
    try {
        return place.placeName ?? 'Unbekannt'
    } catch (e) {
        console.error('Could not get place from', place, e)
    }
}

export const getAutocompletePlaces = function (state) {
    return state.places.map(function (place) {
            return {
                id: place['xml:id'],
                text: place.name
            }
        })
}

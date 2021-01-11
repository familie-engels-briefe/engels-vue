export const getPlaceName = function (place) {
    try {
        if (Array.isArray(place.placeName) && place.placeName.length > 0) {
            return place.placeName[0]
        } else if (typeof place.placeName === 'object') {
            return place.placeName['#text']
        }

        return place.placeName ?? 'Unbekannt'
    } catch (e) {
        console.error('Could not get place from', place, e)
    }
}

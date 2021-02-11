/**
 * @param {HTMLDivElement} wrapper
 * @param {Array} topics
 */
export function highlightTopics(wrapper, topics) {
    // Replace highlights on all topics
    Array.from(wrapper.querySelectorAll('.tei_topic.has-highlight')).forEach(function (topic) {
        topic.classList.remove('has-highlight')
    })

    topics.forEach(function (topic) {
        Array.from(wrapper.querySelectorAll('.engels_topic[data-type="' + topic + '"]')).forEach(function (topic) {
            topic.classList.add('has-highlight')
        })
    })
}

/**
 * @param {HTMLDivElement} wrapper
 * @param {Boolean} highlight
 */
export function highlightPersons(wrapper, highlight) {
    if (highlight) {
        wrapper.querySelectorAll('.tei_persName').forEach(function (tooltip) {
            tooltip.classList.add('has-highlight')
        })
    } else {
        wrapper.querySelectorAll('.tei_persName.has-highlight').forEach(function (tooltip) {
            tooltip.classList.remove('has-highlight')
        })
    }
}

/**
 * @param {HTMLDivElement} wrapper
 * @param {Boolean} highlight
 */
export function highlightOrgs(wrapper, highlight) {
    if (highlight) {
        wrapper.querySelectorAll('.tei_orgName').forEach(function (tooltip) {
            tooltip.classList.add('has-highlight')
        })
    } else {
        wrapper.querySelectorAll('.tei_orgName.has-highlight').forEach(function (tooltip) {
            tooltip.classList.remove('has-highlight')
        })
    }
}


/**
 * @param {HTMLDivElement} wrapper
 * @param {Boolean} highlight
 */
export function highlightPlaces(wrapper, highlight) {
    if (highlight) {
        wrapper.querySelectorAll('.tei_placeName').forEach(function (tooltip) {
            tooltip.classList.add('has-highlight')
        })
    } else {
        wrapper.querySelectorAll('.tei_placeName.has-highlight').forEach(function (tooltip) {
            tooltip.classList.remove('has-highlight')
        })
    }
}

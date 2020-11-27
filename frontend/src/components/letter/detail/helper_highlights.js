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

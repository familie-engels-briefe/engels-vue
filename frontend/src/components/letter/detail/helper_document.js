export function addLineNumbers(wrapper) {
    let i = 1

    wrapper.querySelectorAll('.tei_lb').forEach(function (line) {
        let span = document.createElement('span')
        span.classList.add('line-number')
        span.classList.add('line-number-' + line.classList.toString())
        if (i % 5 !== 0 && i !== 1) {
            span.classList.add('hidden')
        }

        span.innerText = i++

        // Insert after
        line.parentNode.insertBefore(span, line.nextSibling)
        console.log(span)
    })
}

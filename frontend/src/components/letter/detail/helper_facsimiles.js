export function replaceFacsimiles(wrapper) {
    Array.from(wrapper.querySelectorAll('.pb_marker[data-filename] .pagenum a')).forEach(function (link) {
        const href = link.getAttribute('href')
        if (href.lastIndexOf('/') === -1) {
            return
        }

        const filename = href.substring(href.lastIndexOf('/') + 1)

        const facsimileComponent = document.createElement('component')
        facsimileComponent.setAttribute('is', 'FacsimileLink')
        facsimileComponent.setAttribute('filename', filename)
        facsimileComponent.setAttribute(':page', link.innerHTML || 1)
        facsimileComponent.setAttribute('v-on:facsimile-change', 'changeFacsimile(arguments[0])')

        link.replaceWith(facsimileComponent)
    })
}

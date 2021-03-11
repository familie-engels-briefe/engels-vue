/**
 * @param {HTMLElement} wrapper
 */
export function replaceSymbols (wrapper) {
    wrapper.querySelectorAll('.tei_metamark[data-function="separator"]').forEach(function (separator) {
        separator.innerHTML = '|'
    })

    wrapper.querySelectorAll('[data-rendition="#g.enc.tagsdecl.metamark.insertion"]').forEach(function (rendition) {
        rendition.innerHTML = '&int;'
    })
}

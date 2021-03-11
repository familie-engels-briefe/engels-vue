/**
 * @param {HTMLElement} wrapper
 */
export function replaceSymbols (wrapper) {
    wrapper.querySelectorAll('.tei_metamark[data-function="separator"]').forEach(function (separator) {
        separator.innerHTML = '|'
    })
}

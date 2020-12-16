/**
 * Highlight JS
 */
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('json', json)

document.querySelectorAll('pre code').forEach(function (block) {
    console.log('Highlight', block)
    hljs.highlightBlock(block)
})

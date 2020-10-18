import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faFilter, faAlignJustify, faAlignLeft, faCode, faHighlighter } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch)
library.add(faFilter)
library.add(faAlignJustify)
library.add(faAlignLeft)
library.add(faCode)
library.add(faHighlighter)

Vue.component('font-awesome-icon', FontAwesomeIcon)

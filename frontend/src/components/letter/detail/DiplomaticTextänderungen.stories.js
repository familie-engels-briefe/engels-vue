import './../../../mixins/urlbuilder'
import router from './../../../router'
import store from './../../../store/index'
import {
    TextaenderungErsetzenHtml,
    TextaenderungHinzufuegenHtml,
    TextaenderungTilgungHtml,
    TextaenderungUmstellungHtml
} from '../../../data/letter/dipl/presentations-textänderungen'
import DiplomaticComponent from './Diplomatic'

function addCitationEllipsis(html) {
    return '[...] ' + html + ' [...]'
}

export default {
    title: 'Letter/Detail/Diplomatisch/Textänderungen',
    component: DiplomaticComponent,
}

const Template = (args, { argTypes }) => ({
    components: {
        DiplomaticComponent
    },
    router: router,
    store: store,
    template: '' +
        '<div class="flex-grow max-w-6xl mx-auto px-8 md:px-4 lg:px-0">' +
        '<DiplomaticComponent :html="html"></DiplomaticComponent>' +
        '</div>',
    props: Object.keys(argTypes)
})

export const TextaenderungTilgung = Template.bind({})
TextaenderungTilgung.storyName = '2.1 Tilgungen'
TextaenderungTilgung.args = {
    html: addCitationEllipsis(TextaenderungTilgungHtml)
}

export const TextaenderungUmstellung = Template.bind({})
TextaenderungUmstellung.storyName = '2.2 Umstellungen'
TextaenderungUmstellung.args = {
    html: addCitationEllipsis(TextaenderungUmstellungHtml)
}

export const TextaenderungHinzufuegen = Template.bind({})
TextaenderungHinzufuegen.storyName = '2.3 Hinzufügungen und ihre Position'
TextaenderungHinzufuegen.args = {
    html: TextaenderungHinzufuegenHtml
}

export const TextaenderungErsetzen = Template.bind({})
TextaenderungErsetzen.storyName = '2.4 Ersetzungen'
TextaenderungErsetzen.args = {
    html: TextaenderungErsetzenHtml
}

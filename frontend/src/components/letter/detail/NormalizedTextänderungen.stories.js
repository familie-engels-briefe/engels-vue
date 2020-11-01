import './../../../mixins/urlbuilder'
import store from './../../../store/index'
import {
    TextaenderungErsetzenHtml,
    TextaenderungHinzufuegenHtml,
    TextaenderungTilgungHtml,
    TextaenderungUmstellungHtml
} from '../../../data/letter/presentations-textänderungen'
import NormalizedComponent from './Normalized'

function addCitationEllipsis(html) {
    return '[...] ' + html + ' [...]'
}

export default {
    title: 'Letter/Detail/Normalisiert/Textänderungen',
    component: NormalizedComponent,
}

const Template = (args, { argTypes }) => ({
    components: {
        NormalizedComponent
    },
    store: store,
    template: '' +
        '<div class="flex-grow max-w-6xl mx-auto px-8 md:px-4 lg:px-0">' +
        '<NormalizedComponent :html="html"></NormalizedComponent>' +
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
    html: addCitationEllipsis(TextaenderungHinzufuegenHtml)
}

export const TextaenderungErsetzen = Template.bind({})
TextaenderungErsetzen.storyName = '2.4 Ersetzungen'
TextaenderungErsetzen.args = {
    html: TextaenderungErsetzenHtml
}

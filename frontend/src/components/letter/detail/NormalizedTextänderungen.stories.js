import './../../../mixins/urlbuilder'
import {
    TilgungHtml
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
    template: '' +
        '<div class="flex-grow max-w-6xl mx-auto px-8 md:px-4 lg:px-0">' +
        '<NormalizedComponent :html="html"></NormalizedComponent>' +
        '</div>',
    props: Object.keys(argTypes)
})

export const Tilgung = Template.bind({})
Tilgung.storyName = '2.1 Tilgungen'
Tilgung.args = {
    html: addCitationEllipsis(TilgungHtml)
}

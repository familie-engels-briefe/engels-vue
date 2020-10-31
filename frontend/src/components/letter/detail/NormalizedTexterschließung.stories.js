import './../../../mixins/urlbuilder'
import {
    TexterschliessungPersonenHtml
} from '../../../data/letter/presentations-texterschließung'
import NormalizedComponent from './Normalized'

function addCitationEllipsis(html) {
    return '[...] ' + html + ' [...]'
}

export default {
    title: 'Letter/Detail/Normalisiert/Texterschließung',
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

export const TexterschliessungPersonen = Template.bind({})
TexterschliessungPersonen.storyName = '4.1 Personennamen oder Verweise auf Personen'
TexterschliessungPersonen.args = {
    html: TexterschliessungPersonenHtml
}

import './../../../mixins/urlbuilder'
import NormalizedComponent from './Normalized'
import letterLocale from './../../../data/letter/001.js'

export default {
    title: 'Letter/Detail/Normalized',
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

export const Default = Template.bind({})

Default.args = {
    html: letterLocale.html.norm
}

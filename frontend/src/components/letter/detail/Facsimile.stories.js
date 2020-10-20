import './../../../mixins/urlbuilder'
import FacsimileComponent from './Facsimile'
import letterLocale from './../../../data/letter-001.js'

export default {
    title: 'Letter/Detail/Tabs',
    component: FacsimileComponent,
}

const Template = (args, { argTypes }) => ({
    components: {
        FacsimileComponent
    },
    template: '' +
        '<div class="flex-grow max-w-6xl mx-auto px-8 md:px-4 lg:px-0">' +
        '<FacsimileComponent :facsimiles="facsimiles"></FacsimileComponent>' +
        '</div>',
    props: Object.keys(argTypes)
})

export const Facsimile = Template.bind({})

Facsimile.args = {
    facsimiles: letterLocale.facsimiles
}

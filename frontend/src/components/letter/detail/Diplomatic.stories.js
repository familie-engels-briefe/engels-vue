import './../../../mixins/urlbuilder'
import DiplomaticComponent from './Diplomatic'
import letterLocale from './../../../data/letter/001.js'

export default {
    title: 'Letter/Detail/Tabs',
    component: DiplomaticComponent,
}

const Template = (args, { argTypes }) => ({
    components: {
        DiplomaticComponent
    },
    template: '' +
        '<div class="flex-grow max-w-6xl mx-auto px-8 md:px-4 lg:px-0">' +
        '<DiplomaticComponent :html="html"></DiplomaticComponent>' +
        '</div>',
    props: Object.keys(argTypes)
})

export const Diplomatic = Template.bind({})

Diplomatic.args = {
    html: letterLocale.html.dipl
}

import './../../../mixins/urlbuilder'
import XmlComponent from './Xml'
import letterLocale from './../../../data/letter/001.js'

export default {
    title: 'Letter/Detail/Xml',
    component: XmlComponent,
}

const Template = (args, { argTypes }) => ({
    components: {
        XmlComponent
    },
    template: '' +
        '<div class="flex-grow max-w-6xl mx-auto px-8 md:px-4 lg:px-0">' +
        '<XmlComponent :xml="xml"></XmlComponent>' +
        '</div>',
    props: Object.keys(argTypes)
})

export const Default = Template.bind({})

Default.args = {
    xml: letterLocale.xml.substring(0, 500)
}

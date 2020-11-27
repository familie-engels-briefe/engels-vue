import './../../../mixins/urlbuilder'
import Highlighter from './Highlighter'
import letterLocale from './../../../data/letter/001.js'

export default {
    title: 'Letter/Detail/Highlighter',
    component: Highlighter,
}

const Template = (args, { argTypes }) => ({
    components: {
        Highlighter
    },
    template: '' +
        '<div class="w-96 float-right">' +
        '<Highlighter :html="dipl"></Highlighter>' +
        '</div>',
    props: Object.keys(argTypes)
})

export const Default = Template.bind({})

Default.args = {
    dipl: letterLocale.html.dipl
}

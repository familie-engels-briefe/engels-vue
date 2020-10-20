import './../../../mixins/urlbuilder'
import Highlighter from './Highlighter'
import letterLocale from './../../../data/letter-001.js'

export default {
    title: 'Letter/Detail/Highlighter',
    component: Highlighter,
}

const Template = (args, { argTypes }) => ({
    components: {
        Highlighter
    },
    template: '' +
        '<div class="w-40">' +
        '<Highlighter :letter="letter"></Highlighter>' +
        '</div>',
    props: Object.keys(argTypes)
})

export const Default = Template.bind({})

Default.args = {
    letter: letterLocale
}

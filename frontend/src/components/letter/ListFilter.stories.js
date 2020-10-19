import './../../mixins/urlbuilder'
import ListFilter from './ListFilter'
import lettersLocal from './../../data/letters.js'

export default {
    title: 'Letter/ListFilter',
    component: ListFilter,
}

const Template = (args, { argTypes }) => ({
    components: {
        ListFilter
    },
    template: '' +
        '<div class="w-32">' +
        '<ListFilter :letters="lettersLocal"></ListFilter>' +
        '</div>',
    props: Object.keys(argTypes)
})

export const Default = Template.bind({})

Default.args = {
    lettersLocal: lettersLocal
}

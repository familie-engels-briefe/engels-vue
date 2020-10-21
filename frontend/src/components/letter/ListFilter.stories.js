import './../../mixins/urlbuilder'
import ListFilter from './ListFilter'
import lettersLocal from '../../data/letter/all.js'

export default {
    title: 'Letter/List/Filter',
    component: ListFilter,
}

const Template = (args, { argTypes }) => ({
    components: {
        ListFilter
    },
    template: '<ListFilter :letters="lettersLocal"></ListFilter>',
    props: Object.keys(argTypes)
})

export const Default = Template.bind({})

Default.args = {
    lettersLocal: lettersLocal
}

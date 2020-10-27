import './../../mixins/urlbuilder'
import store from './../../store/index'
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
    store: store,
    template: '' +
        '<div class="w-96">' +
        '<ListFilter :letters="lettersLocal"></ListFilter>' +
        '</div>',
    props: Object.keys(argTypes)
})

export const Default = Template.bind({})

Default.args = {
    lettersLocal: lettersLocal
}

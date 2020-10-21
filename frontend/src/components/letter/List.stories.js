import './../../mixins/urlbuilder'
import List from './List'
import lettersLocal from '../../data/letter/all.js'

export default {
    title: 'Letter/List',
    component: List,
}

const Template = (args, { argTypes }) => ({
    components: {
        List
    },
    template: '' +
        '<div class="flex-grow max-w-6xl mx-auto px-8 md:px-4 lg:px-0">' +
        '<List :letters-local="lettersLocal"></List>' +
        '</div>',
    props: Object.keys(argTypes)
})

export const Default = Template.bind({})

Default.args = {
    lettersLocal: lettersLocal
}

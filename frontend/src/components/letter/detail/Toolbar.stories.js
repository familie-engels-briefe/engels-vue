import './../../../mixins/urlbuilder'
import Toolbar from './Toolbar'

export default {
    title: 'Letter/Detail/Toolbar',
    component: Toolbar,
}

const Template = (args, { argTypes }) => ({
    components: {
        Toolbar
    },
    template: '<Toolbar :active="active"></Toolbar>',
    props: Object.keys(argTypes)
})

export const Default = Template.bind({})

Default.args = {
    active: 'normalized'
}

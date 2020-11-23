import BasePage from './BasePage'
import frontpage from '../../data/wordpress/frontpage'

export default {
    title: 'Page/Wordpress',
    component: BasePage,
}

const Template = (args, { argTypes }) => ({
    components: {
        BasePage
    },
    template: '<BasePage :html="html"></BasePage>',
    props: Object.keys(argTypes)
})

export const Default = Template.bind({})

Default.args = {
    html: frontpage.content.raw
}

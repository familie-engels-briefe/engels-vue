import Page from './Page'
import frontpage from '../../data/wordpress/frontpage'

export default {
    title: 'Page/Wordpress/Page',
    component: Page,
}

const Template = (args, { argTypes }) => ({
    components: {
        Page
    },
    template: '<Page :html="html"></Page>',
    props: Object.keys(argTypes)
})

export const Default = Template.bind({})

Default.args = {
    html: frontpage.content.raw
}

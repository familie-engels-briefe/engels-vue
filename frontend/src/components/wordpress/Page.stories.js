import Page from './Page'

export default {
    title: 'Wordpress/Page',
    component: Page,
}

export const Default = (args, { argTypes }) => ({
    components: {
        Page
    },
    template: '<Page :html="html"></Page>',
    props: Object.keys(argTypes)
})

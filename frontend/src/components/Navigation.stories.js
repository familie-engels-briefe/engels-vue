import Navigation from './Navigation'

export default {
    title: 'Page/Navigation',
    component: Navigation
}

export const Default = () => ({
    components: {
        Navigation
    },
    template: '' +
        '<div class="flex-grow max-w-6xl mx-auto px-8 md:px-4 lg:px-0">' +
        '<Navigation></Navigation>' +
        '</div>'
})

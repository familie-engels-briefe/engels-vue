import Button from './Button'

export default {
    title: 'Page/Button',
    component: Button,
}

export const Default = () => ({
    components: {
        Button
    },
    template: '<Button>Test</Button>'
})

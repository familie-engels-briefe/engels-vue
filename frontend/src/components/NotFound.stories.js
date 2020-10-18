import NotFound from './NotFound'

export default {
    title: 'Page/404',
    component: NotFound,
}

export const Default = () => ({
    components: {
        NotFound
    },
    template: '<NotFound></NotFound>'
})

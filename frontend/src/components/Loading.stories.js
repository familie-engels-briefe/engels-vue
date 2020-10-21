import Loading from './Loading'

export default {
    title: 'Page/Loading',
    component: Loading,
}

export const Default = () => ({
    components: {
        Loading
    },
    template: '<Loading :loading="true"></Loading>'
})

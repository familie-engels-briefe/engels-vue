import './../../../mixins/urlbuilder'
import Detail from './Detail'
import letterLocale from './../../../data/letter-001.js'

export default {
    title: 'Letter/Detail',
    component: Detail,
}

const Template = (args, { argTypes }) => ({
    components: {
        Detail
    },
    template: '' +
        '<div class="flex-grow max-w-6xl mx-auto px-8 md:px-4 lg:px-0">' +
        '<Detail :letter-local="letterLocale"></Detail>' +
        '</div>',
    props: Object.keys(argTypes)
})

export const Complete = Template.bind({})

letterLocale.loaded = true

Complete.args = {
    letterLocale: letterLocale
}

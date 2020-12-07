import Tooltip from './Tooltip'

export default {
    title: 'Page/Tooltip',
    component: Tooltip,
}

const Template = () => ({
    components: {
        Tooltip
    },
    template: `<p>Tooltip für <Tooltip content="Das ist der Inhalt des <strong>Tooltips</strong>. Das könnte hier z.B. eine kurze Erkärung sein, wer Friedrich Engels ist." :url="{ 'xml:id': 'person.friedrich.engels' }">Friedrich Engels</Tooltip>.</p>`
})

export const Default = Template.bind({})
Default.storyName = 'Default'

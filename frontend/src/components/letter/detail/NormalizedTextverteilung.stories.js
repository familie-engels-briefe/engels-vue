import './../../../mixins/urlbuilder'
import {
    TextverteilungAbsatzstrukturenHtml,
    TextverteilungOpenerAllgemeinHtml,
    TextverteilungOpenerInlineHtml,
    TextverteilungOpenerInlineSignifikantHtml,
    TextverteilungWorttrennungenHtml,
    TextverteilungWritingSessionHtml
} from '../../../data/letter/presentations-textverteilung'
import NormalizedComponent from './Normalized'

function addCitationEllipsis(html) {
    return '[...] ' + html + ' [...]'
}

export default {
    title: 'Letter/Detail/Normalisiert/Textverteilung',
    component: NormalizedComponent,
}

const Template = (args, { argTypes }) => ({
    components: {
        NormalizedComponent
    },
    template: '' +
        '<div class="flex-grow max-w-6xl mx-auto px-8 md:px-4 lg:px-0">' +
        '<NormalizedComponent :html="html"></NormalizedComponent>' +
        '</div>',
    props: Object.keys(argTypes)
})

export const TextverteilungWritingSession = Template.bind({})
TextverteilungWritingSession.storyName = '3.1 Writing Session'
TextverteilungWritingSession.args = {
    html: TextverteilungWritingSessionHtml
}

export const TextverteilungAbsatzstrukturen = Template.bind({})
TextverteilungAbsatzstrukturen.storyName = '3.2 Absatzstrukturen'
TextverteilungAbsatzstrukturen.args = {
    html: TextverteilungAbsatzstrukturenHtml
}

export const TextverteilungWorttrennungen = Template.bind({})
TextverteilungWorttrennungen.storyName = '3.4 Worttrennung'
TextverteilungWorttrennungen.args = {
    html: TextverteilungWorttrennungenHtml
}

export const TextverteilungOpenerAllgemein = Template.bind({})
TextverteilungOpenerAllgemein.storyName = '3.5 Opener / Brieferöffnung (Allgemein)'
TextverteilungOpenerAllgemein.args = {
    html: TextverteilungOpenerAllgemeinHtml
}

export const TextverteilungOpenerInline = Template.bind({})
TextverteilungOpenerInline.storyName = '3.5 Opener / Brieferöffnung (Inline)'
TextverteilungOpenerInline.args = {
    html: TextverteilungOpenerInlineHtml
}

export const TextverteilungOpenerInlineSignifikant = Template.bind({})
TextverteilungOpenerInlineSignifikant.storyName = '3.5 Opener / Brieferöffnung (Inline - Signifikant)'
TextverteilungOpenerInlineSignifikant.args = {
    html: TextverteilungOpenerInlineSignifikantHtml
}

import './../../../mixins/urlbuilder'
import letterLocale from './../../../data/letter/001.js'
import './../../../data/letter/presentations.js'
import {
    LigaturenHtml,
    NichtEindeutigeZeichenHtml,
    NichtEntzifferbareZeichenHtml,
    SchreiberspezifischeZeichenHtml,
    Suspensionszeichen1Html,
    Suspensionszeichen2Html,
    Suspensionszeichen3Html,
    TextverlustAllgemeinHtml,
    UnvollstaendigeZeichenHtml,
    WaehrungssysmboleHtml,
    ZeichenAndererOrtHtml,
    ZeichenHistorischHtml
} from './../../../data/letter/presentations'
import NormalizedComponent from './Normalized'

export default {
    title: 'Letter/Detail/Normalized',
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

export const Fonts = Template.bind({})
Fonts.storyName = '1.2 Schrift'
Fonts.args = {
    html: letterLocale.html.norm
}

export const Waehrungssysmbole = Template.bind({})
Waehrungssysmbole.storyName = '1.3.1.1 Währungssymbole'
Waehrungssysmbole.args = {
    html: WaehrungssysmboleHtml
}

export const Ligaturen = Template.bind({})
Ligaturen.storyName = '1.3.1.3 Ligaturen'
Ligaturen.args = {
    html: LigaturenHtml
}

export const Suspensionszeichen1 = Template.bind({})
Suspensionszeichen1.storyName = '1.3.1.4 Suspensionszeichen - 1'
Suspensionszeichen1.args = {
    html: Suspensionszeichen1Html
}

export const Suspensionszeichen2 = Template.bind({})
Suspensionszeichen2.storyName = '1.3.1.4 Suspensionszeichen - 2'
Suspensionszeichen2.args = {
    html: Suspensionszeichen2Html
}

export const Suspensionszeichen3 = Template.bind({})
Suspensionszeichen3.storyName = '1.3.1.4 Suspensionszeichen - 3'
Suspensionszeichen3.args = {
    html: Suspensionszeichen3Html
}

export const ZeichenHistorisch = Template.bind({})
ZeichenHistorisch.storyName = '1.3.2 Zeichen mit besonderer historischer Bedeutung'
ZeichenHistorisch.args = {
    html: ZeichenHistorischHtml
}

export const SchreiberspezifischeZeichen = Template.bind({})
SchreiberspezifischeZeichen.storyName = '1.3.3 Schreiber/innenspezifische Zeichen'
SchreiberspezifischeZeichen.args = {
    html: SchreiberspezifischeZeichenHtml
}

export const NichtEindeutigeZeichen = Template.bind({})
NichtEindeutigeZeichen.storyName = '1.4 Nicht eindeutig gelesene Zeichen'
NichtEindeutigeZeichen.args = {
    html: NichtEindeutigeZeichenHtml
}

export const NichtEntzifferbareZeichen = Template.bind({})
NichtEntzifferbareZeichen.storyName = '1.5 Nicht entzifferbare Zeichen'
NichtEntzifferbareZeichen.args = {
    html: NichtEntzifferbareZeichenHtml
}

export const UnvollstaendigeZeichen = Template.bind({})
UnvollstaendigeZeichen.storyName = '1.6 Unvollständige Zeichen / Buchstabenansatz'
UnvollstaendigeZeichen.args = {
    html: UnvollstaendigeZeichenHtml
}

export const TextverlustAllgemein = Template.bind({})
TextverlustAllgemein.storyName = '1.7.1 Textverlust i. Allg.'
TextverlustAllgemein.args = {
    html: TextverlustAllgemeinHtml
}

export const ZeichenAndererOrt = Template.bind({})
ZeichenAndererOrt.storyName = '1.7.2 Zeichen am anderen Ort'
ZeichenAndererOrt.args = {
    html: ZeichenAndererOrtHtml
}

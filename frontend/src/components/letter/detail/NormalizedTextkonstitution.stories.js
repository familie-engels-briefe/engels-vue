import './../../../mixins/urlbuilder'
import store from './../../../store/index'
import letterLocale from './../../../data/letter/001.js'
import {
    AbbrevationenExpansionHtml,
    AbbrevationenSpezialHtml,
    AbbrevationenSuspensionHtml,
    HervorhebungUnterstreichungHtml,
    KombinationVonHervorhebungenHtml,
    LigaturenHtml,
    HochTiefstellungHtml,
    NichtEindeutigeZeichenHtml,
    NichtEntzifferbareZeichenHtml,
    SchreiberspezifischeZeichenHtml,
    Suspensionszeichen1Html,
    Suspensionszeichen2Html,
    Suspensionszeichen3Html,
    TexteingriffeBedingteExpansionHtml,
    TexteingriffeEmendationenHtml,
    TexteingriffeErlaeuterndeExpansionenHtml,
    TexteingriffeInterpunktionHtml,
    TexteingriffeNormalisierungHtml,
    TexteingriffeRekonstruierteZeichenHtml,
    TextverlustAllgemeinHtml,
    UnvollstaendigeZeichenHtml,
    WaehrungssysmboleHtml,
    ZeichenAndererOrtHtml,
    ZeichenHistorischHtml
} from './../../../data/letter/presentations-textkonstitution'
import NormalizedComponent from './Normalized'

function addCitationEllipsis(html) {
    return '[...] ' + html + ' [...]'
}

export default {
    title: 'Letter/Detail/Normalisiert/Textkonstitution',
    component: NormalizedComponent,
}

const Template = (args, { argTypes }) => ({
    components: {
        NormalizedComponent
    },
    store: store,
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
    html: addCitationEllipsis(WaehrungssysmboleHtml)
}

export const Ligaturen = Template.bind({})
Ligaturen.storyName = '1.3.1.3 Ligaturen'
Ligaturen.args = {
    html: addCitationEllipsis(LigaturenHtml)
}

export const Suspensionszeichen1 = Template.bind({})
Suspensionszeichen1.storyName = '1.3.1.4 Suspensionszeichen - 1'
Suspensionszeichen1.args = {
    html: addCitationEllipsis(Suspensionszeichen1Html)
}

export const Suspensionszeichen2 = Template.bind({})
Suspensionszeichen2.storyName = '1.3.1.4 Suspensionszeichen - 2'
Suspensionszeichen2.args = {
    html: addCitationEllipsis(Suspensionszeichen2Html)
}

export const Suspensionszeichen3 = Template.bind({})
Suspensionszeichen3.storyName = '1.3.1.4 Suspensionszeichen - 3'
Suspensionszeichen3.args = {
    html: addCitationEllipsis(Suspensionszeichen3Html)
}

export const ZeichenHistorisch = Template.bind({})
ZeichenHistorisch.storyName = '1.3.2 Zeichen mit besonderer historischer Bedeutung'
ZeichenHistorisch.args = {
    html: addCitationEllipsis(ZeichenHistorischHtml)
}

export const SchreiberspezifischeZeichen = Template.bind({})
SchreiberspezifischeZeichen.storyName = '1.3.3 Schreiber/innenspezifische Zeichen'
SchreiberspezifischeZeichen.args = {
    html: addCitationEllipsis(SchreiberspezifischeZeichenHtml)
}

export const NichtEindeutigeZeichen = Template.bind({})
NichtEindeutigeZeichen.storyName = '1.4 Nicht eindeutig gelesene Zeichen'
NichtEindeutigeZeichen.args = {
    html: addCitationEllipsis(NichtEindeutigeZeichenHtml)
}

export const NichtEntzifferbareZeichen = Template.bind({})
NichtEntzifferbareZeichen.storyName = '1.5 Nicht entzifferbare Zeichen'
NichtEntzifferbareZeichen.args = {
    html: addCitationEllipsis(NichtEntzifferbareZeichenHtml)
}

export const UnvollstaendigeZeichen = Template.bind({})
UnvollstaendigeZeichen.storyName = '1.6 Unvollständige Zeichen / Buchstabenansatz'
UnvollstaendigeZeichen.args = {
    html: addCitationEllipsis(UnvollstaendigeZeichenHtml)
}

export const TextverlustAllgemein = Template.bind({})
TextverlustAllgemein.storyName = '1.7.1 Textverlust i. Allg.'
TextverlustAllgemein.args = {
    html: addCitationEllipsis(TextverlustAllgemeinHtml)
}

export const ZeichenAndererOrt = Template.bind({})
ZeichenAndererOrt.storyName = '1.7.2 Zeichen am anderen Ort'
ZeichenAndererOrt.args = {
    html: addCitationEllipsis(ZeichenAndererOrtHtml)
}

export const AbbrevationenExpansion = Template.bind({})
AbbrevationenExpansion.storyName = '1.8.1 Abbreviation & Expansion allgemein'
AbbrevationenExpansion.args = {
    html: addCitationEllipsis(AbbrevationenExpansionHtml)
}

export const AbbrevationenSpezial = Template.bind({})
AbbrevationenSpezial.storyName = '1.8.2 Spezialfälle'
AbbrevationenSpezial.args = {
    html: addCitationEllipsis(AbbrevationenSpezialHtml)
}

export const AbbrevationenSuspension = Template.bind({})
AbbrevationenSuspension.storyName = '1.8.3 Suspensionen'
AbbrevationenSuspension.args = {
    html: AbbrevationenSuspensionHtml
}

export const HervorhebungUnterstreichung = Template.bind({})
HervorhebungUnterstreichung.storyName = '1.9.1 Unterstreichung'
HervorhebungUnterstreichung.args = {
    html: addCitationEllipsis(HervorhebungUnterstreichungHtml)
}

export const HochTiefstellung = Template.bind({})
HochTiefstellung.storyName = '1.9.2 Hoch- und Tiefstellung von Zeichen'
HochTiefstellung.args = {
    html: HochTiefstellungHtml
}

export const KombinationVonHervorhebungen = Template.bind({})
KombinationVonHervorhebungen.storyName = '1.9.3 Kombination von Hervorhebungen'
KombinationVonHervorhebungen.args = {
    html: addCitationEllipsis(KombinationVonHervorhebungenHtml)
}

export const TexteingriffeEmendationen = Template.bind({})
TexteingriffeEmendationen.storyName = '1.10.1 Emendationen'
TexteingriffeEmendationen.args = {
    html: addCitationEllipsis(TexteingriffeEmendationenHtml)
}

export const TexteingriffeNormalisierung = Template.bind({})
TexteingriffeNormalisierung.storyName = '1.10.2.1 Orthografische Normalisierung'
TexteingriffeNormalisierung.args = {
    html: addCitationEllipsis(TexteingriffeNormalisierungHtml)
}

export const TexteingriffeInterpunktion = Template.bind({})
TexteingriffeInterpunktion.storyName = '1.10.2.2 Normalisierung von Interpunktionszeichen'
TexteingriffeInterpunktion.args = {
    html: addCitationEllipsis(TexteingriffeInterpunktionHtml)
}

export const TexteingriffeBedingteExpansion = Template.bind({})
TexteingriffeBedingteExpansion.storyName = '1.10.2.3 Bedingte Darstellung von Expansionen'
TexteingriffeBedingteExpansion.args = {
    html: addCitationEllipsis(TexteingriffeBedingteExpansionHtml)
}

export const TexteingriffeErlaeuterndeExpansionen = Template.bind({})
TexteingriffeErlaeuterndeExpansionen.storyName = '1.10.2.4 Erläuternde Expansionen'
TexteingriffeErlaeuterndeExpansionen.args = {
    html: addCitationEllipsis(TexteingriffeErlaeuterndeExpansionenHtml)
}

export const TexteingriffeRekonstruierteZeichen = Template.bind({})
TexteingriffeRekonstruierteZeichen.storyName = '1.10.3 Rekonstruierte Zeichen'
TexteingriffeRekonstruierteZeichen.args = {
    html: addCitationEllipsis(TexteingriffeRekonstruierteZeichenHtml)
}

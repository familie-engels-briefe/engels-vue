import './../../../mixins/urlbuilder'
import router from './../../../router'
import store from './../../../store/index'
import {
    TextverteilungAbsatzstrukturenHtml,
    TextverteilungBeschriftungUmschlaegeHtml,
    TextverteilungCloserDatumHtml,
    TextverteilungCloserHtml,
    TextverteilungCloserInlineHtml,
    TextverteilungEinzuegeHtml,
    TextverteilungInterlinearHtml,
    TextverteilungKustodenHtml,
    TextverteilungLeerraumHtml,
    TextverteilungNichtLinearMarginalHtml,
    TextverteilungNichtLinearTextEinweisungHtml,
    TextverteilungNichtLinearTextLinearHtml,
    TextverteilungNichtLinearTextNichtLinearHtml,
    TextverteilungNichtLinearTextReferenzHtml,
    TextverteilungOpenerAllgemeinHtml,
    TextverteilungOpenerAnredeHtml,
    TextverteilungOpenerDatumHtml,
    TextverteilungOpenerInlineHtml,
    TextverteilungOpenerInlineSignifikantHtml,
    TextverteilungPostskriptumHtml,
    TextverteilungSchreibrichtungHtml,
    TextverteilungTabellenHtml,
    TextverteilungWorttrennungenHtml,
    TextverteilungWritingSessionHtml,
    TextverteilungZeilenumbruchHtml
} from '../../../data/letter/dipl/presentations-textverteilung'
import DiplomaticComponent from './Diplomatic'

function addCitationEllipsis(html) {
    return '[...] ' + html + ' [...]'
}

export default {
    title: 'Letter/Detail/Diplomatisch/Textverteilung',
    component: DiplomaticComponent,
}

const Template = (args, { argTypes }) => ({
    components: {
        DiplomaticComponent
    },
    router: router,
    store: store,
    template: '' +
        '<div class="flex-grow max-w-6xl mx-auto px-8 md:px-4 lg:px-0">' +
        '<DiplomaticComponent :html="html"></DiplomaticComponent>' +
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

export const TextverteilungZeilenumbruch = Template.bind({})
TextverteilungZeilenumbruch.storyName = '3.3 Zeilen- und Seitenumbruch'
TextverteilungZeilenumbruch.args = {
    html: TextverteilungZeilenumbruchHtml
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

export const TextverteilungOpenerDatum = Template.bind({})
TextverteilungOpenerDatum.storyName = '3.5.1 Datumszeile'
TextverteilungOpenerDatum.args = {
    html: TextverteilungOpenerDatumHtml
}

export const TextverteilungOpenerAnrede = Template.bind({})
TextverteilungOpenerAnrede.storyName = '3.5.2 Anrede'
TextverteilungOpenerAnrede.args = {
    html: TextverteilungOpenerAnredeHtml
}

export const TextverteilungCloser = Template.bind({})
TextverteilungCloser.storyName = '3.6 Closer / Briefschluss (Allgemein)'
TextverteilungCloser.args = {
    html: TextverteilungCloserHtml
}

export const TextverteilungCloserInline = Template.bind({})
TextverteilungCloserInline.storyName = '3.6 Closer / Briefschluss (Inline)'
TextverteilungCloserInline.args = {
    html: TextverteilungCloserInlineHtml
}

export const TextverteilungCloserGrussformel = Template.bind({})
TextverteilungCloserGrussformel.storyName = '3.6.1 Grußformel'
TextverteilungCloserGrussformel.args = {
    html: TextverteilungCloserInlineHtml
}

export const TextverteilungCloserUnterschrift = Template.bind({})
TextverteilungCloserUnterschrift.storyName = '3.6.2 Unterschrift'
TextverteilungCloserUnterschrift.args = {
    html: TextverteilungCloserInlineHtml
}

export const TextverteilungCloserDatum = Template.bind({})
TextverteilungCloserDatum.storyName = '3.6.3 Datumszeile'
TextverteilungCloserDatum.args = {
    html: TextverteilungCloserDatumHtml
}

export const TextverteilungPostskriptum = Template.bind({})
TextverteilungPostskriptum.storyName = '3.7 Postskriptum'
TextverteilungPostskriptum.args = {
    html: TextverteilungPostskriptumHtml
}

export const TextverteilungKustoden = Template.bind({})
TextverteilungKustoden.storyName = '3.8 Kustoden'
TextverteilungKustoden.args = {
    html: TextverteilungKustodenHtml
}

export const TextverteilungSchreibrichtung = Template.bind({})
TextverteilungSchreibrichtung.storyName = '3.9 Schreibrichtung'
TextverteilungSchreibrichtung.args = {
    html: addCitationEllipsis(TextverteilungSchreibrichtungHtml)
}

export const TextverteilungLeerraum = Template.bind({})
TextverteilungLeerraum.storyName = '3.10 Leerraum'
TextverteilungLeerraum.args = {
    html: TextverteilungLeerraumHtml
}

export const TextverteilungEinzuege = Template.bind({})
TextverteilungEinzuege.storyName = '3.11 Einzüge'
TextverteilungEinzuege.args = {
    html: TextverteilungEinzuegeHtml
}

export const TextverteilungNichtLinearTextLinear = Template.bind({})
TextverteilungNichtLinearTextLinear.storyName = '3.12.1 Nicht-lineare Verteilung von Textsegmenten (linearisierbar)'
TextverteilungNichtLinearTextLinear.args = {
    html: addCitationEllipsis(TextverteilungNichtLinearTextLinearHtml)
}

export const TextverteilungNichtLinearTextNichtLinear = Template.bind({})
TextverteilungNichtLinearTextNichtLinear.storyName = '3.12.1 Nicht-lineare Verteilung von Textsegmenten (nicht linearisierbar)'
TextverteilungNichtLinearTextNichtLinear.args = {
    html: TextverteilungNichtLinearTextNichtLinearHtml
}

export const TextverteilungNichtLinearTextEinweisung = Template.bind({})
TextverteilungNichtLinearTextEinweisung.storyName = '3.12.1 Nicht-lineare Verteilung von Textsegmenten (Einweisungszeichen)'
TextverteilungNichtLinearTextEinweisung.args = {
    html: addCitationEllipsis(TextverteilungNichtLinearTextEinweisungHtml)
}

export const TextverteilungNichtLinearTextReferenz = Template.bind({})
TextverteilungNichtLinearTextReferenz.storyName = '3.12.1 Nicht-lineare Verteilung von Textsegmenten (Referenzzeichen)'
TextverteilungNichtLinearTextReferenz.args = {
    html: addCitationEllipsis(TextverteilungNichtLinearTextReferenzHtml)
}

export const TextverteilungNichtLinearMarginal = Template.bind({})
TextverteilungNichtLinearMarginal.storyName = '3.12.2 Marginaltext'
TextverteilungNichtLinearMarginal.args = {
    html: TextverteilungNichtLinearMarginalHtml
}

export const TextverteilungInterlinear = Template.bind({})
TextverteilungInterlinear.storyName = '3.13 Interlineartext'
TextverteilungInterlinear.args = {
    html: TextverteilungInterlinearHtml
}

export const TextverteilungBeschriftungUmschlaege = Template.bind({})
TextverteilungBeschriftungUmschlaege.storyName = '3.14 Beschriftung von Briefumschlägen'
TextverteilungBeschriftungUmschlaege.args = {
    html: TextverteilungBeschriftungUmschlaegeHtml
}

export const TextverteilungTabellen = Template.bind({})
TextverteilungTabellen.storyName = '3.15 Tabellenstrukturen'
TextverteilungTabellen.args = {
    html: addCitationEllipsis(TextverteilungTabellenHtml)
}

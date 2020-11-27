import './../../../mixins/urlbuilder'
import store from './../../../store/index'
import {
    TexterschliessungBriefNichtReferenzierbarHtml,
    TexterschliessungBriefReferenzierbarHtml,
    TexterschliessungDatumAllgemeinHtml,
    TexterschliessungDatumFehlerhaftHtml, TexterschliessungFremdeHaendeHtml,
    TexterschliessungOrganisationHtml,
    TexterschliessungOrganisationVerweisHtml,
    TexterschliessungOrtHtml,
    TexterschliessungOrtVerweisHtml,
    TexterschliessungPersonenHtml,
    TexterschliessungPersonenVerweisHtml,
    TexterschliessungStellenerlaeuterungHtml,
    TexterschliessungTextkritischerKommentarHtml, TexterschliessungThematischeMarkierungHtml
} from '../../../data/letter/norm/presentations-texterschließung'
import NormalizedComponent from './Normalized'

function addCitationEllipsis (html) {
    return '[...] ' + html + ' [...]'
}

export default {
    title: 'Letter/Detail/Normalisiert/Texterschließung',
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

store.commit('setPersons', [{
    "xml:id": "pers.partic.engels-elise",
    "n": "unified",
    "#text": ["", "", "", "", "", "", "", "", "", ""],
    "idno": { "type": "gnd", "#text": "189469986" },
    "persName": [{
        "type": "reg",
        "#text": ["", "", "", ""],
        "surname": "Engels",
        "forename": "Elisabeth",
        "addName": { "type": "nick", "#text": "Elise" }
    }, {
        "type": "full",
        "#text": ["", "", "", "", ""],
        "surname": "Engels",
        "forename": ["Elisabeth", "Franziska", "Mauritia"]
    }, {
        "type": "full",
        "subtype": "born",
        "to": "1854",
        "#text": ["", "", "", "", "", ""],
        "surname": "Haar",
        "nameLink": "van",
        "forename": ["Elisabeth", "Franziska", "Mauritia"]
    }, {
        "type": "alt",
        "#text": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        "addName": [{ "type": "pseud", "#text": "neue Schwiegertochter" }, {
            "type": "nick",
            "#text": "Herzensbr\u00e4utchen"
        }, { "type": "nick", "#text": "T\u00f6chterchen" }, { "type": "pseud", "#text": "Braut" }, {
            "type": "nick",
            "#text": "gutes Kind"
        }, { "type": "nick", "#text": "Herzchen" }, { "type": "nick", "#text": "Herzens Thierchen" }, {
            "type": "nick",
            "#text": "Herzens Gesichtchen"
        }, { "type": "nick", "#text": "Herzens Fr\u00e4uchen" }, {
            "type": "nick",
            "#text": "Herzensweibchen"
        }, { "type": "nick", "#text": "herzenshi Gel\u00fcst" }, {
            "type": "nick",
            "#text": ["Herzens", "mama", ""],
            "space": { "rend": "join", "type": "separate-spelling" }
        }, { "type": "nick", "#text": "altes liebes Gesicht" }, {
            "type": "nick",
            "#text": ["Herzens", "lieseli", ""],
            "space": { "rend": "join", "type": "separate-spelling" }
        }, {
            "type": "nick",
            "#text": ["Herzens", "kind", ""],
            "space": { "rend": "join", "type": "separate-spelling" }
        }]
    }],
    "sex": { "value": "F" },
    "birth": {
        "#text": ["", "", ""],
        "date": { "when": "1797-04-22" },
        "placeName": {
            "ref": "#place.hamm",
            "#text": ["    ", ""],
            "settlement": "Hamm"
        }
    },
    "death": {
        "#text": ["", "", ""],
        "date": { "when": "1873-10-29" },
        "placeName": {
            "ref": "#place.barmen",
            "#text": ["    ", ""],
            "settlement": "Barmen"
        }
    },
    "note": {
        "type": "backlinks",
        "#text": " fe.e1.255, fe.e1.257, fe.e1.258, fe.e1.276, fe.e1.277, fe130, fe131, fe142, fe150, fe151, fe152, fe155, fe156, fe157, fe158, fe159, fe161, fe162, fe164, fe169, fe181, fe182, fe183, fe185, fe186, fe187, fe188, fe189, fe190, fe191, fe192, fe193, fe194, fe195, fe196, fe197, fe198, fe199, fe200, fe201, fe202, fe203, fe204, fe206, fe207, fe208, fe209, fe210, fe219, fe221, fe222, fe226, fe232, fe233, fe234, fe235, fe235a, fe236, fe238, fe239, fe240, fe241, fe242, fe243, fe244, fe245, fe245, fe247, fe248, fe249, fe250, fe252, fe253, fe254, fe255, fe256, fe257, fe258, fe259, fe265, fe269, fe271, fe272, fe273, fe274, fe275, fe276, fe277, fe278, fe279, fe280, fe282, fe283, fe284, fe285, fe286, fe287, fe288, fe289, fe295, fe296, fe307, fe308, fe336, fe337, fe338, fe342, fe40 "
    }
}, {
    "xml:id": "pers.partic.keetman-johann-junior",
    "n": "unified",
    "#text": ["\n                        ", "\n                        ", "\n                        ", "\n                        ", "\n                        ", "\n                    "],
    "persName": {
        "type": "reg",
        "#text": ["\n                            ", "\n                            ", "\n                            ", "\n                        "],
        "surname": "Keetman",
        "forename": "Johann",
        "genName": "junior"
    },
    "birth": {
        "#text": ["\n                            ", "\n                            ", "\n                        "],
        "date": { "when": "1793" },
        "placeName": {
            "ref": "#place.hamburg",
            "#text": ["\n                                ", "\n                            "],
            "settlement": "Hamburg"
        }
    },
    "death": {
        "#text": ["\n                            ", "\n                            ", "\n                        "],
        "date": { "when": "1865" },
        "placeName": {
            "ref": "#place.elberfeld",
            "#text": ["\n                                ", "\n                            "],
            "settlement": "Elberfeld"
        }
    },
    "sex": { "value": "M" },
    "note": {
        "type": "backlinks",
        "#text": " fe065, fe066, fe068, fe078, fe081, fe084, fe089,\n                            fe091, fe092, fe093, fe094, fe095, fe096, fe097, fe098, fe099, fe100,\n                            fe101, fe103, fe104, fe118, fe130, fe131, fe143, fe152, fe154, fe156, fe157,\n                            fe158, fe159, fe191, fe205, fe207, fe221, fe222 "
    }
}])

store.commit('setPlaces', [{
    "xml:id": "place.london",
    "n": "unified",
    "#text": ["\n                        ", "\n                        ", "\n                        ", "\n                        ", "\n                    "],
    "placeName": "London",
    "idno": [
        { "type": "TGN", "#text": "7011781" },
        { "type": "GND", "#text": "4074335-4" }
    ],
    "note": {
        "type": "backlinks",
        "#text": " fe106, fe110, fe245, fe246, fe282, fe283, fe284,\n                            fe285, fe295, fe307, fe308, fe336, fe338 "
    }
}, {
    "xml:id": "place.berlin",
    "n": "unified",
    "#text": ["\n                        ", "\n                        ", "\n                        ", "\n                        ", "\n                    "],
    "placeName": "Berlin",
    "idno": [
        { "type": "TGN", "#text": "7003712" },
        { "type": "GND", "#text": "4005728-8" }
    ],
    "note": {
        "type": "backlinks",
        "#text": " fe036, fe038, fe054, fe157, fe163, fe165, fe183, fe193,\n                            fe195, fe197, fe220, fe226, fe232, fe233, fe234, fe235, fe235a, fe236, fe237, fe238,\n                            fe239, fe240, fe246, fe247, fe249, fe265, fe284, fe285, fe288, fe289, fe295,\n                            fe336 "
    }
}])

store.commit('setOrganisations', [{
    "xml:id": "org.andry-und-guibout",
    "n": "unified",
    "#text": ["\n                        ", "\n                        ", "\n                    "],
    "orgName": "Andry&Guibout",
    "note": { "type": "backlinks", "#text": " fe295 " }
}])

store.commit('setLetters', [{
    "number": "103",
    "version": "0.3.01",
    "name": "fe103.xml",
    "date": "1815-04-23",
    "doctype": "letter",
    "#text": "Johann Keetman jun., Neuwied, an Friedrich Engels sen., Barmen, 23. April 1815, Sonntag (Brief)",
    "sent": { "person": { "ref": "#pers.partic.keetman-johann-junior" }, "place": { "ref": "#place.neuwied" } },
    "received": { "person": { "ref": "#pers.partic.engels-friedrich-senior" }, "place": { "ref": "#place.barmen" } },
    "mentioned": {
        "persons": { "person": [{ "ref": "#pers.partic.engels-friedrich-senior" }, { "ref": "#pers.partic.engels-johann-caspar-III" }, { "ref": "#pers.partic.heubes-johann-heinrich" }, { "ref": "#pers.partic.mozin-dominique" }, { "ref": "#pers.partic.buecking-unknown" }, { "ref": "#pers.partic.giffroy-isidor" }, { "ref": "#pers.partic.bernoully-johann" }, { "ref": "#pers.partic.neufville-matthias-wilhelm" }, { "ref": "#pers.partic.keetman-johann-junior" }] },
        "places": { "place": [{ "ref": "#place.barmen" }, { "ref": "#place.neuwied" }, { "ref": "#place.frankfurt-am-main" }, { "ref": "#place.muelheim-am-rhein" }] },
        "organisations": { "place": [{ "ref": "#org.caspar-engels-soehne" }, { "ref": "#org.frowein-j-g" }] }
    }
}])

store.commit('setLoaded', true)

export const TexterschliessungPersonen = Template.bind({})
TexterschliessungPersonen.storyName = '4.1 Personennamen oder Verweise auf Personen (Personennamen)'
TexterschliessungPersonen.args = {
    html: addCitationEllipsis(TexterschliessungPersonenHtml)
}

export const TexterschliessungPersonenVerweis = Template.bind({})
TexterschliessungPersonenVerweis.storyName = '4.1 Personennamen oder Verweise auf Personen (Verweis)'
TexterschliessungPersonenVerweis.args = {
    html: addCitationEllipsis(TexterschliessungPersonenVerweisHtml)
}

export const TexterschliessungOrt = Template.bind({})
TexterschliessungOrt.storyName = '4.2 Ortsbezeichnungen oder Verweise auf Orte (Ortsbezeichnungen)'
TexterschliessungOrt.args = {
    html: addCitationEllipsis(TexterschliessungOrtHtml)
}

export const TexterschliessungOrtVerweis = Template.bind({})
TexterschliessungOrtVerweis.storyName = '4.2 Ortsbezeichnungen oder Verweise auf Orte (Verweis)'
TexterschliessungOrtVerweis.args = {
    html: addCitationEllipsis(TexterschliessungOrtVerweisHtml)
}

export const TexterschliessungOrganisation = Template.bind({})
TexterschliessungOrganisation.storyName = '4.3 Organisationsnamen oder Verweise auf Organisationen (Organisationsname)'
TexterschliessungOrganisation.args = {
    html: addCitationEllipsis(TexterschliessungOrganisationHtml)
}

export const TexterschliessungOrganisationVerweis = Template.bind({})
TexterschliessungOrganisationVerweis.storyName = '4.3 Organisationsnamen oder Verweise auf Organisationen (Verweis)'
TexterschliessungOrganisationVerweis.args = {
    html: TexterschliessungOrganisationVerweisHtml
}

export const TexterschliessungDatumAllgemein = Template.bind({})
TexterschliessungDatumAllgemein.storyName = '4.4 Datumsangaben (Allgemein)'
TexterschliessungDatumAllgemein.args = {
    html: TexterschliessungDatumAllgemeinHtml
}

export const TexterschliessungDatumFehlerhaft = Template.bind({})
TexterschliessungDatumFehlerhaft.storyName = '4.4 Datumsangaben (Fehlerhaft)'
TexterschliessungDatumFehlerhaft.args = {
    html: TexterschliessungDatumFehlerhaftHtml
}

export const TexterschliessungBriefReferenzierbar = Template.bind({})
TexterschliessungBriefReferenzierbar.storyName = '4.5 Verweise auf andere Briefdokumente (referenzierbar)'
TexterschliessungBriefReferenzierbar.args = {
    html: TexterschliessungBriefReferenzierbarHtml
}

export const TexterschliessungBriefNichtReferenzierbar = Template.bind({})
TexterschliessungBriefNichtReferenzierbar.storyName = '4.5 Verweise auf andere Briefdokumente (nicht referenzierbar)'
TexterschliessungBriefNichtReferenzierbar.args = {
    html: TexterschliessungBriefNichtReferenzierbarHtml
}

export const TexterschliessungStellenerlaeuterung = Template.bind({})
TexterschliessungStellenerlaeuterung.storyName = '4.6.1 Stellenerläuterungen'
TexterschliessungStellenerlaeuterung.args = {
    html: TexterschliessungStellenerlaeuterungHtml
}

export const TexterschliessungTextkritischerKommentar = Template.bind({})
TexterschliessungTextkritischerKommentar.storyName = '4.6.2 Textkritischer Kommentar'
TexterschliessungTextkritischerKommentar.args = {
    html: TexterschliessungTextkritischerKommentarHtml
}

export const TexterschliessungThematischeMarkierung = Template.bind({})
TexterschliessungThematischeMarkierung.storyName = '4.7 Thematische Markierung von Textpassagen'
TexterschliessungThematischeMarkierung.args = {
    html: TexterschliessungThematischeMarkierungHtml
}

export const TexterschliessungFremdeHaende = Template.bind({})
TexterschliessungFremdeHaende.storyName = '4.8 Fremde Hände'
TexterschliessungFremdeHaende.args = {
    html: TexterschliessungFremdeHaendeHtml
}

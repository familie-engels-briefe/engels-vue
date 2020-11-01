import './../../../mixins/urlbuilder'
import store from './../../../store/index'
import {
    TexterschliessungPersonenHtml,
    TexterschliessungPersonenVerweisHtml
} from '../../../data/letter/presentations-texterschließung'
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
}])

store.commit('setLoaded', true)

export const TexterschliessungPersonen = Template.bind({})
TexterschliessungPersonen.storyName = '4.1 Personennamen oder Verweise auf Personen (Personennamen)'
TexterschliessungPersonen.args = {
    html: TexterschliessungPersonenHtml
}

export const TexterschliessungPersonenVerweis = Template.bind({})
TexterschliessungPersonenVerweis.storyName = '4.1 Personennamen oder Verweise auf Personen (Verweis)'
TexterschliessungPersonenVerweis.args = {
    html: TexterschliessungPersonenVerweisHtml
}

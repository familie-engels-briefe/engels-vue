import store from './../../store/index'
import RegisterPerson from './Person'

export default {
    title: 'Register/Person',
    component: RegisterPerson
}

store.commit('setPersons', [{
    "xml:id": "pers.partic.engels-friedrich-senior",
    "n": "unified",
    "#text": [
        "\n                        ",
        "\n                        ",
        "\n                        ",
        "\n                        ",
        "\n                        ",
        "\n                        ",
        "\n                        ",
        "\n                        ",
        "\n                    "
    ],
    "idno": {
        "type": "gnd",
        "#text": "123495911"
    },
    "persName": [
        {
            "type": "reg",
            "#text": [
                "\n                            ",
                "\n                            ",
                "\n                            ",
                "\n                        "
            ],
            "surname": "Engels",
            "forename": "Friedrich",
            "genName": "senior"
        },
        {
            "type": "alt",
            "#text": [
                "\n                            ",
                "\n                            ",
                "\n                            ",
                "\n                            ",
                "\n                        "
            ],
            "addName": [
                {
                    "type": "nick",
                    "#text": "Manne"
                },
                {
                    "type": "pseud",
                    "#text": "F."
                },
                {
                    "type": "nick",
                    "#text": "Frid"
                },
                {
                    "type": "nick",
                    "#text": "Männeken"
                }
            ]
        }
    ],
    "sex": [
        {
            "value": "M"
        },
        {
            "value": "M"
        }
    ],
    "birth": {
        "#text": [
            "\n                            ",
            "\n                            ",
            "\n                        "
        ],
        "date": {
            "when": "1796"
        },
        "placeName": {
            "ref": "#place.barmen",
            "#text": [
                "\n                                ",
                "\n                            "
            ],
            "settlement": "Barmen"
        }
    },
    "death": {
        "#text": [
            "\n                            ",
            "\n                            ",
            "\n                        "
        ],
        "date": {
            "when": "1860"
        },
        "placeName": {
            "ref": "#place.barmen",
            "#text": [
                "\n                                ",
                "\n                            "
            ],
            "settlement": "Barmen"
        }
    },
    "note": {
        "type": "backlinks",
        "#text": " fe041, fe057, fe058, fe059, fe060, fe061, fe062, fe063, fe064, fe065,\n                            fe066, fe067, fe068, fe069, fe070, fe071, fe072, fe073, fe074, fe075,\n                            fe082, fe083, fe086, fe087, fe088, fe089, fe090, fe091, fe102, fe103, fe104,\n                            fe105, fe106, fe107, fe109, fe110, fe111, fe112, fe114, fe115, fe116, fe118, fe119, fe150, fe199, fe200,\n                            fe201, fe202, fe203, fe221, fe222, fe226, fe076, fe077, fe078, fe079,\n                            fe080, fe081, fe084, fe092, fe093, fe094, fe095, fe096, fe097, fe098,\n                            fe099, fe100, fe101, fe124, fe125, fe126, fe127, fe129, fe130, fe131,\n                            fe132, fe133, fe134, fe135, fe136, fe137, fe138, fe139, fe140, fe141,\n                            fe142, fe143, fe144, fe145, fe146, fe151, fe152, fe153, fe154, fe155,\n                            fe156, fe157, fe158, fe159, fe160, fe161, fe162, fe163, fe164, fe165, fe169,\n                            fe181, fe182, fe183, fe184, fe185, fe186, fe187, fe188, fe189, fe190,\n                            fe191, fe192, fe193, fe194, fe195, fe196, fe197, fe198, fe205, fe206, fe207, fe208,\n                            fe209, fe210, fe219, fe223, fe225, fe235, fe235a, fe241, fe242, fe243, fe244, fe245, fe246,\n                            fe247, fe248, fe249, fe250, fe252, fe253, fe254, fe255, fe256, fe257, fe258,\n                            fe259, fe265, fe269, fe271, fe272, fe273, fe274, fe275, fe276, fe277, fe278,\n                            fe279, fe280, fe282, fe283, fe284, fe285, fe286, fe287, fe288, fe289,\n                            fe295, fe296, fe307, fe308, fe336, fe337, fe338, fe342, fe.e1.255, fe.e1.257,\n                            fe.e1.258, fe.e1.276, fe.e1.277, fe.e2.255, fe.e2.258 "
    }
}])

store.commit('setLoaded', true)

export const Default = () => ({
    components: {
        RegisterPerson
    },
    store: store,
    template: '' +
        '<div class="flex-grow max-w-6xl mx-auto px-8 md:px-4 lg:px-0">' +
        '<RegisterPerson id="#pers.partic.engels-friedrich-senior"></RegisterPerson>' +
        '</div>'
})

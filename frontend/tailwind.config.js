module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
        defaultLineHeights: true,
        standardFontWeights: true
    },
    purge: [
        './public/**/*.html',
        './**/*.vue'
    ],
    theme: {
        colors: {
            brown: '#3b2618',
            gold: '#c3ab8d',
            pastell: '#dAd3cc',
            black: '#000000',
            'gray-darkest': '#090401',
            'gray-darker': '#333333',
            'gray-dark2': '#525252',
            'gray-dark': '#828282',
            gray: '#BDBDBD',
            'gray-light': '#C4C4C4',
            'gray-lighter': '#f2f2f2',
            'gray-lightest': '#fefefe',
            white: '#ffffff',
            purple: '#BB6BD9',
            green: '#6FCF97',
            orange: '#F2994A',
            red: '#EB5757',
            blue: '#56CCF2',
            yellow: '#E7CA2A',
            transparent: 'transparent'
        },
        extend: {
            fontFamily: {
                sans: [
                    'Roboto',
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    '"Noto Sans"',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
                serif: ['Playfair Display', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
            }
        },
        variants: {},
        plugins: []
    }
}

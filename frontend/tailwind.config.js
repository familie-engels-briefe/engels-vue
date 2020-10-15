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
            'gray-dark': '#333333',
            gray: '#BDBDBD',
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

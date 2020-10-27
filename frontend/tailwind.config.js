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
            pastell: '#dad3cc',
            black: '#000000',
            'gray-darkest': '#090401',
            'gray-darker': '#333333',
            'gray-dark2': '#525252',
            'gray-dark': '#828282',
            gray: '#bdbdbd',
            'gray-light': '#c4c4c4',
            'gray-lighter': '#f2f2f2',
            'gray-lightest': '#fefefe',
            white: '#ffffff',
            purple: '#bb6bd9',
            green: '#6fcf97',
            orange: '#f2994a',
            red: '#eb5757',
            blue: '#56ccf2',
            yellow: '#e7ca2a',
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
                    '"Noto Color Emoji"'
                ],
                serif: [
                    'Playfair Display',
                    'Georgia',
                    'Cambria',
                    '"Times New Roman"',
                    'Times',
                    'serif'
                ],
                'letter-sans': [
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
                    '"Noto Color Emoji"'
                ],
                'letter-serif': [
                    'Georgia',
                    'Cambria',
                    '"Times New Roman"',
                    'Times',
                    'serif'
                ]
            }
        }
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    },
    plugins: []
}

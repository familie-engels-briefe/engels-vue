const colors = require('tailwindcss/colors')

module.exports = {
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
            transparent: 'transparent',

            rose: {
                50: colors.rose['50'],
            },
            pink: {
                50: colors.pink['50'],
            },
            fuchsia: {
                50: colors.fuchsia['50'],
            },
            purple: {
                50: colors.purple['50'],
            },
            violet: {
                50: colors.violet['50'],
            },
            indigo: {
                50: colors.indigo['50'],
            },
            blue: {
                50: colors.blue['50'],
            },
            lightBlue: {
                50: '#f0f9ff',
                100: '#e0f2fe',
                200: '#bae6fd',
                300: '#7dd3fc',
                400: '#38bdf8',
                500: '#0ea5e9',
                600: '#0284c7',
                700: '#0369a1',
                800: '#075985',
                900: '#0c4a6e',
            },
            cyan: {
                50: colors.cyan['50'],
            },
            teal: {
                50: colors.teal['50'],
            },
            emerald: {
                50: colors.emerald['50'],
            },
            green: {
                50: colors.green['50'],
            },
            lime: {
                50: colors.lime['50'],
            },
            yellow: {
                50: colors.yellow['50'],
            },
            amber: {
                50: colors.amber['50'],
            },
            orange: {
                50: colors.orange['50'],
            },
            red: {
                50: colors.red['50'],
                100: '#fee2e2',
                900: '#7f1d1d',
            },
            warmGray: {
                50: colors.warmGray['50'],
            },
            blueGray: {
                50: colors.blueGray['50'],
            },
            coolGray: {
                50: colors.coolGray['50'],
            },
        },
        extend: {
            fontFamily: {
                sans: [
                    'Roboto',
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
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
            },
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90'
            }
        }
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    },
    plugins: []
}

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
                100: '#ffe4e6',
            },
            pink: {
                100: '#fce7f3',
            },
            fuchsia: {
                100: '#fae8ff',
            },
            purple: {
                100: '#f3e8ff',
            },
            violet: {
                100: '#ede9fe',
            },
            indigo: {
                100: '#e0e7ff',
            },
            blue: {
                100: '#dbeafe',
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
                100: '#cffafe',
            },
            teal: {
                100: '#ccfbf1',
            },
            emerald: {
                100: '#d1fae5',
            },
            green: {
                100: '#dcfce7',
            },
            lime: {
                100: '#ecfccb',
            },
            yellow: {
                100: '#fef9c3',
            },
            amber: {
                100: '#fef3c7',
            },
            orange: {
                100: '#ffedd5',
            },
            red: {
                100: '#fee2e2',
                900: '#7f1d1d',
            },
            warmGray: {
                100: '#f5f5f4',
            },
            blueGray: {
                100: '#f1f5f9',
            },
            coolGray: {
                100: '#f3f4f6',
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

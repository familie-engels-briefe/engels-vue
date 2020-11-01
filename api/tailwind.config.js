module.exports = {
    future: {
        purgeLayersByDefault: true
    },
    theme: {
        extend: {}
    },
    variants: {},
    plugins: [],
    purge: {
        enabled: true,
        content: ['./resources/views/**/*.blade.php']
    },
}

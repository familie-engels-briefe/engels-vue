<template>
    <div class="pb-24">
        <pre class="overflow-x-auto bg-gray-lighter p-4"><code v-text="xml" class="language-xml"></code></pre>
    </div>
</template>

<script>
import Prism from 'prismjs';
import 'prismjs/components/prism-markup'
import 'prismjs/themes/prism-tomorrow.css'

export default {
    name: 'LetterXml',
    props: {
        xml: {
            type: String,
            required: true
        }
    },
    mounted () {
        console.debug('Mounted Letter/Detail/Xml')

        Prism.highlightAll()
    }
}
</script>

<style scoped>

</style>

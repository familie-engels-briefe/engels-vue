<template>
    <div id="app" class="min-h-screen flex flex-col">
        <div class="flex-grow max-w-6xl w-full mx-auto px-8 xl:px-0 mb-16">
            <Navigation></Navigation>

            <main>
                <router-view></router-view>
            </main>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default {
    name: 'Engels',
    components: {
        Navigation,
        Footer
    },
    mounted () {
        console.debug('Mounted App')
    }
}
</script>

<style>

</style>

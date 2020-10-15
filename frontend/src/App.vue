<template>
    <div id="app" class="min-h-screen flex flex-col">
        <div class="flex-grow max-w-6xl mx-auto px-8 md:px-4 lg:px-0">
            <header class="flex flex-row py-4 mb-12">
                <div>
                    <h1 class="text-2xl font-medium tracking-wide">
                        <router-link to="/">
                            Industriegeschichte Privat
                        </router-link>
                    </h1>
                </div>

                <Navigation></Navigation>
            </header>

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

<template>
    <div id="app" class="min-h-screen flex flex-col">
        <div class="flex-grow max-w-6xl w-full mx-auto px-8 xl:px-0 mb-16">
            <Navigation></Navigation>

            <main>
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
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
    },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}
</style>

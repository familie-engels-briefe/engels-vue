import Vue from 'vue'
import VueRouter from 'vue-router'

import FrontPage from '@/components/wordpress/FrontPage'
import NotFound from '@/components/NotFound'

Vue.use(VueRouter)

const ROUTE_SUFFIX = ' | Industriegeschichte Privat'

const routes = [
    {
        path: '',
        component: FrontPage,
        name: 'frontpage',
        meta: {
            title: 'Familie Engels Briefe' + ROUTE_SUFFIX
        }
    },
    {
        // 404
        path: '*',
        component: NotFound,
        name: 'not-found',
        meta: {
            title: 'Die Seite konnte leider nicht gefunden werden' + ROUTE_SUFFIX
        }
    }
]

const router = new VueRouter({
    routes: routes
})

router.afterEach((to) => {
    Vue.nextTick(() => {
        if (typeof to.meta.title === 'string') {
            document.title = to.meta.title
        } else {
            document.title = to.meta.title(to)
        }
    })
})

export default router

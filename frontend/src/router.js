import Vue from 'vue'
import VueRouter from 'vue-router'

import LetterList from './components/letter/List'
import LetterDetail from './components/letter/detail/Detail'
import FrontPage from './components/wordpress/FrontPage'
import Page from './components/wordpress/Page'

Vue.use(VueRouter)

const ROUTE_SUFFIX = ' | Industriegeschichte Privat'

export const routes = [
    {
        path: '',
        component: FrontPage,
        name: 'frontpage',
        meta: {
            title: 'Familie Engels Briefe' + ROUTE_SUFFIX
        }
    },
    {
        path: '/briefe',
        component: LetterList,
        name: 'letters',
        meta: {
            title: 'Briefe' + ROUTE_SUFFIX
        }
    },
    {
        path: '/briefe/:number',
        component: LetterDetail,
        name: 'letter',
        props: true,
        meta: {
            title: function (to) {
                return 'Brief ' + to.params.number + ROUTE_SUFFIX
            }
        }
    },
    {
        // 404
        path: '*',
        component: Page,
        name: 'wordpress',
        props: function (route) {
            return {
                slug: route.path.replace('/', '')
            }
        },
        meta: {
            title: function (to) {
                return to.path.replace('/', '')
            }
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

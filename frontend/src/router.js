import Vue from 'vue'
import VueRouter from 'vue-router'

import LetterList from './components/letter/List'
import LetterDetail from './components/letter/detail/Detail'
import RegisterList from './components/register/List'
import RegisterPerson from './components/register/Person'
import RegisterPlace from './components/register/Place'
import RegisterOrg from './components/register/Org'
import FrontPage from './components/wordpress/FrontPage'
import Page from './components/wordpress/Page'
import SearchResult from './components/SearchResult'
import DebugSentry from './components/DebugSentry'

Vue.use(VueRouter)

const ROUTE_BASE_NAME = 'Industriegeschichte Privat - Die Familie Engels in Briefen (1791 - 1851)'
const ROUTE_SUFFIX = ' | ' + ROUTE_BASE_NAME

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
        path: '/register',
        component: RegisterList,
        name: 'registers',
        meta: {
            title: 'Register' + ROUTE_SUFFIX
        }
    },
    {
        path: '/register/person/:id',
        component: RegisterPerson,
        name: 'register.person',
        props: true,
        meta: {
            title: function (to) {
                return 'Person ' + to.params.id + ROUTE_SUFFIX
            }
        }
    },
    {
        path: '/register/ort/:id',
        component: RegisterPlace,
        name: 'register.place',
        props: true,
        meta: {
            title: function (to) {
                return 'Ort ' + to.params.id + ROUTE_SUFFIX
            }
        }
    },
    {
        path: '/register/unternehmen/:id',
        component: RegisterOrg,
        name: 'register.org',
        props: true,
        meta: {
            title: function (to) {
                return 'Unternehmen ' + to.params.id + ROUTE_SUFFIX
            }
        }
    },
    {
        path: '/suche/:term',
        component: SearchResult,
        name: 'search',
        props: true,
        meta: {
            title: function (to) {
                return 'Suche nach "' + to.params.term + '"' + ROUTE_SUFFIX
            }
        }
    },
    {
        path: '/debug-sentry',
        component: DebugSentry
    },
    {
        // 404
        path: '*',
        component: Page,
        name: 'wordpress',
        props: function (route) {
            return {
                slug: decodeURI(route.path.replace('/', ''))
            }
        },
        meta: {
            title: function (to) {
                return decodeURI(to.path.replace('/', ''))
            }
        }
    }
]

const router = new VueRouter({
    routes: routes,
    mode: 'history'
})

router.afterEach((to) => {
    Vue.nextTick(() => {
        if (!to.meta.title) {
            document.title = ROUTE_BASE_NAME
        }

        if (typeof to.meta.title === 'string') {
            document.title = to.meta.title
        } else {
            document.title = to.meta.title(to)
        }
    })
})

export default router

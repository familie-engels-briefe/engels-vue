import StoryRouter from 'storybook-vue-router'

import { routes } from '../src/router'
import '../src/icons'

import '../src/assets/styles/index.css'

export const parameters = {
    actions: {
        argTypesRegex: "^on[A-Z].*"
    },
}

export const decorators = [
    StoryRouter({}, {
        routes: routes
    })
]

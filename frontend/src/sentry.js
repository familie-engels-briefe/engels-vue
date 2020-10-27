import Vue from 'vue'
import * as Sentry from "@sentry/browser"
import { Vue as VueIntegration } from "@sentry/integrations"
import { Integrations } from "@sentry/tracing"

Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_DSN,
    environment: process.env.VUE_APP_ENVIRONMENT,
    integrations: [
        new VueIntegration({
            Vue,
            tracing: true,
        }),
        new Integrations.BrowserTracing(),
    ],

    tracesSampleRate: process.env.VUE_APP_SENTRY_TRACE_SAMPLE_RATE
})

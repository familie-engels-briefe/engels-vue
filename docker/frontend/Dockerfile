FROM node:lts-alpine

ARG VUE_APP_API_BASE_URL
ENV VUE_APP_API_BASE_URL $VUE_APP_API_BASE_URL
ARG VUE_APP_WORDPRESS_BASE_URL
ENV VUE_APP_WORDPRESS_BASE_URL $VUE_APP_WORDPRESS_BASE_URL
ARG VUE_APP_SENTRY_DSN
ENV VUE_APP_SENTRY_DSN $VUE_APP_SENTRY_DSN
ARG VUE_APP_SENTRY_TRACE_SAMPLE_RATE
ENV VUE_APP_SENTRY_TRACE_SAMPLE_RATE $VUE_APP_SENTRY_TRACE_SAMPLE_RATE
ARG VUE_APP_ENVIRONMENT
ENV VUE_APP_ENVIRONMENT $VUE_APP_ENVIRONMENT
ARG VUE_APP_MATOMO_URL
ENV VUE_APP_MATOMO_URL $VUE_APP_MATOMO_URL
ARG VUE_APP_MATOMO_SITE_ID
ENV VUE_APP_MATOMO_SITE_ID $VUE_APP_MATOMO_SITE_ID

RUN echo "API URL $VUE_APP_API_BASE_URL"

# Add files
ADD ./frontend/ /frontend/

WORKDIR /frontend

# Create .npmrc for fontawesome and install dependencies
ARG NPM_AUTH_TOKEN

# Install dependencies and build application
RUN touch .npmrc && \
    echo "@fortawesome:registry=https://npm.fontawesome.com/" >> .npmrc && \
    echo "//npm.fontawesome.com/:_authToken=$NPM_AUTH_TOKEN" >> .npmrc && \
    cat .npmrc && \
    yarn install && \
    yarn run build && \
    rm ./.npmrc && \
    rm -fr ./node_modules && \
    rm -fr ~/.cache

RUN mkdir -p /dist

VOLUME /dist

# Copy files to dist folder when its mounted
CMD /frontend/start.sh

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

RUN echo "API URL $VUE_APP_API_BASE_URL"

# Add files
ADD ./frontend/ /frontend/

WORKDIR /frontend

# Create .npmrc for fontawesome and install dependencies
ARG NPM_AUTH_TOKEN

RUN touch .npmrc && \
    echo "@fortawesome:registry=https://npm.fontawesome.com/" >> .npmrc && \
    echo "//npm.fontawesome.com/:_authToken=$NPM_AUTH_TOKEN" >> .npmrc && \
    yarn install && \
    rm .npmrc

# Build for production
RUN yarn run build

RUN mkdir -p /dist

VOLUME /dist

# Copy files to dist folder when its mounted
CMD /frontend/start.sh

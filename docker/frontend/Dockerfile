FROM node:lts-alpine

# Add files
ADD ./frontend/ /frontend/

WORKDIR /frontend

# Install dependencies
RUN yarn install

# Build for production
RUN yarn run build

VOLUME /frontend/dist

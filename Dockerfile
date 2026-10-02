# Pull images for various tasks
FROM node:24.16.0-bookworm AS node-fat
RUN yarn config set network-timeout 600000 -g

# Production only image
FROM node:24.16.0-alpine3.24 AS node-slim
ENV NODE_ENV=production
RUN apk add --no-cache supervisor

# Install deps
FROM node-fat AS deps
WORKDIR /builder
# Copy all package.json files
COPY package.json yarn.lock ./
COPY repo/apps/frontend/package.json    repo/apps/frontend/package.json
COPY repo/packages/types                repo/packages/types
# Run the actual install command
RUN yarn --frozen-lockfile
COPY turbo.json ./
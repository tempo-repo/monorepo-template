# Pull images for various tasks
FROM node:24.16.0-bookworm AS node-fat
RUN yarn config set network-timeout 600000 -g

# Production only image
FROM node:24.16.0-alpine3.24 AS node-slim

# Install deps
FROM node-fat AS deps
WORKDIR /builder
# Copy root package info
COPY    package.json yarn.lock \
        turbo.json \
        ./
# Copy frontend deps
COPY repo/apps/frontend/package.json    repo/apps/frontend/package.json
COPY repo/apps/frontend/yarn.lock       repo/apps/frontend/yarn.lock
# Run the actual install command
RUN yarn --frozen-lockfile

# Assemble frontend
FROM deps AS build-frontend
COPY repo/apps/frontend/public              repo/apps/frontend/public
COPY repo/apps/frontend/src                 repo/apps/frontend/src
COPY repo/apps/frontend/postcss.config.mjs  repo/apps/frontend/postcss.config.mjs
COPY repo/apps/frontend/tsconfig.build.json repo/apps/frontend/tsconfig.build.json
COPY repo/apps/frontend/tsconfig.json       repo/apps/frontend/tsconfig.json
RUN yarn --cwd repo/apps/frontend build

CMD ["tail", "-f", "/dev/null"]
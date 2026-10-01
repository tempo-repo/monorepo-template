# Pull images for various tasks
FROM node:24.16.0-bookworm AS node-fat
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

CMD ["tail", "-f", "/dev/null"]
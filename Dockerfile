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

CMD ["tail", "-f", "/dev/null"]
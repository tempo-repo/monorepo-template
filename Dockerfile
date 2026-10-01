# Pull images for various tasks
FROM node:24.16-ubuntu AS node-fat
FROM node:24.16-alpine AS node-slim

# Install deps
FROM node-fat AS builder
WORKDIR /builder
COPY    package.json yarn.lock \
        turbo.json \
        ./

CMD ["tail", "-f", "/dev/null"]
# Pull images for various tasks
FROM node:24.16.0-bookworm AS node-fat
RUN yarn config set network-timeout 600000 -g

# Production only image
FROM node:24.16.0-alpine3.24 AS node-slim
ENV NODE_ENV=production
RUN apk add --no-cache supervisor

# Install deps
FROM node-fat AS builder
WORKDIR /builder
# Copy all package.json files
COPY package.json yarn.lock ./
COPY repo/apps/frontend/package.json    repo/apps/frontend/package.json
COPY repo/apps/backend/package.json     repo/apps/backend/package.json
COPY repo/packages/types                repo/packages/types
# Run the actual install command
RUN yarn --frozen-lockfile
COPY turbo.json ./

# Copy frontend source code
ENV NEXT_PUBLIC_CANONICAL_URL=http://replacemelater.com
COPY repo/apps/frontend/public              repo/apps/frontend/public
COPY repo/apps/frontend/src                 repo/apps/frontend/src
COPY repo/apps/frontend/next.config.ts      repo/apps/frontend/next.config.ts
COPY repo/apps/frontend/postcss.config.mjs  repo/apps/frontend/postcss.config.mjs
COPY repo/apps/frontend/tsconfig.build.json repo/apps/frontend/tsconfig.build.json
COPY repo/apps/frontend/tsconfig.json       repo/apps/frontend/tsconfig.json
# Copy backend source code
COPY repo/apps/backend/prisma               repo/apps/backend/prisma
COPY repo/apps/backend/src                  repo/apps/backend/src
COPY repo/apps/backend/nest-cli.json        repo/apps/backend/nest-cli.json
COPY repo/apps/backend/prisma.config.ts     repo/apps/backend/prisma.config.ts
COPY repo/apps/backend/tsconfig.build.json  repo/apps/backend/tsconfig.build.json
COPY repo/apps/backend/tsconfig.json        repo/apps/backend/tsconfig.json
COPY repo/apps/backend/webpack.config.js    repo/apps/backend/webpack.config.js

RUN turbo run build

CMD ["turbo", "run", "start:production", "--filter", "@apps/frontend"]
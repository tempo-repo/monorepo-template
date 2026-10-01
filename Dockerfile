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

# Assemble frontend
FROM deps AS build-frontend
ENV NEXT_PUBLIC_CANONICAL_URL=http://replacemelater.com
COPY repo/apps/frontend/public              repo/apps/frontend/public
COPY repo/apps/frontend/src                 repo/apps/frontend/src
COPY repo/apps/frontend/next.config.ts      repo/apps/frontend/next.config.ts
COPY repo/apps/frontend/postcss.config.mjs  repo/apps/frontend/postcss.config.mjs
COPY repo/apps/frontend/tsconfig.build.json repo/apps/frontend/tsconfig.build.json
COPY repo/apps/frontend/tsconfig.json       repo/apps/frontend/tsconfig.json
RUN yarn turbo run build --filter=@apps/frontend

# Production image
FROM node-slim AS runner

WORKDIR /runner/frontend

COPY --from=build-frontend  /builder/repo/apps/frontend/public              ./public
COPY --from=build-frontend  /builder/repo/apps/frontend/.next/standalone    ./
COPY --from=build-frontend  /builder/repo/apps/frontend/.next/static        ./.next/static

# Run production image
COPY docker/supervisord.conf /etc/supervisord.conf
USER root
CMD ["supervisord", "-c", "/etc/supervisord.conf"]

#WORKDIR /runner
#USER root
#CMD ["tail", "-f", "/dev/null"]
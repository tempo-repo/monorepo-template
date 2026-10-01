FROM node:22.22.1-alpine AS base
ENV NODE_ENV=production
WORKDIR /app

FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock* ./
RUN NODE_ENV=development yarn --frozen-lockfile

FROM base AS builder
COPY ./src ./src
COPY ./public ./public
COPY package.json yarn.lock* .env* ./
COPY tsconfig.json tsconfig.build.json postcss.config.mjs next.config.ts ./
COPY --from=deps /app/node_modules ./node_modules
RUN yarn run build

FROM base AS runner

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
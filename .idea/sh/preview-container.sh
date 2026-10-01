#!/bin/bash

# Build actual container
docker buildx build \
  --platform linux/amd64 \
  -t monorepo-template-app:0.0.1 \
  .

docker compose up -d

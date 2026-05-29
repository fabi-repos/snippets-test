# Build
FROM node:lts-alpine3.23 AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Serve
FROM nginxinc/nginx-unprivileged:alpine-slim
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080
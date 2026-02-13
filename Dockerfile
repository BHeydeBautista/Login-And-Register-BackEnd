# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app

# --------------------
# Development image
# --------------------
FROM base AS dev
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

# --------------------
# Build stage
# --------------------
FROM base AS build
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json nest-cli.json ./
COPY src ./src
COPY test ./test
RUN npm run build

# --------------------
# Production image
# --------------------
FROM base AS prod
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
COPY public ./public
EXPOSE 3000
CMD ["node", "dist/main"]

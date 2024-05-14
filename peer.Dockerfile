#Build frontend
FROM node:lts as build-frontend

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /build

COPY frontend/package.json package-lock.json ./
RUN npm i --package-lock-only && npm ci && npm cache clean --force

COPY frontend ./
RUN npm run build
RUN npm prune --production


#Build backend
FROM node:lts as build-backend

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /build

COPY backend-peer/package.json package-lock.json ./
RUN npm ci && npm cache clean --force

COPY backend-peer ./
RUN npm run build
RUN npm prune --production


# Production stage
FROM node:lts-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Need curl for healthcheck
RUN apt-get update && \
    apt-get install -y curl

WORKDIR /app

COPY --from=build-backend \
    /build/package.json \
    /build/package-lock.json \
    /build/build \
    ./

COPY --from=build-backend /build/node_modules ./node_modules
COPY --from=build-backend /build/prisma ./prisma

COPY --from=build-frontend /build/build /www

EXPOSE 3000

HEALTHCHECK --interval=5s --timeout=5s --retries=20 \
    CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["npm", "start"]

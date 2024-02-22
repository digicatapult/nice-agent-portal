#Build stage
FROM node:lts as build

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /build

RUN mkdir frontend backend
COPY frontend/package.json frontend/package-lock.json ./frontend
COPY backend/package.json backend/package-lock.json ./backend
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force


COPY frontend ./frontend
COPY backend ./backend
RUN npm run build


# Test stage
FROM build as test

WORKDIR /build

ARG NODE_ENV=test
ENV NODE_ENV=${NODE_ENV}

#COPY .mocharc.json .eslint* ./
#COPY tests ./tests

CMD npm run test


# Production stage
FROM node:lts-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app

COPY --from=build /build/frontend/build /www

COPY --from=build \
	/build/backend/package.json \
	/build/backend/package-lock.json \
	.
COPY --from=build /build/backend/node_modules ./node_modules
COPY --from=build /build/backend/build ./build

RUN npm prune

EXPOSE 3000

CMD ["npm", "start"]

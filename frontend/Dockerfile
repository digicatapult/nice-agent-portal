# docker build -t nice-agent-portal .
# docker run --rm -h gui --name gui -p 3000:80 nice-agent-portal
ARG NODE_VERSION=20-alpine
FROM node:$NODE_VERSION AS build

RUN npm -g install npm@10.x.x

WORKDIR /nice-agent-portal

# Install base dependencies
COPY . .
RUN npm i

# RUN Build
RUN npm run build

##################################################################################################

FROM nginx:1.27.0-alpine AS runtime

WORKDIR /nice-agent-portal

COPY --from=build /nice-agent-portal/build .

# COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf # OLD
RUN sed -i 's|/usr/share/nginx/html|/nice-agent-portal|' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

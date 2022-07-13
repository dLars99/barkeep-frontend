FROM node:14 AS builder
WORKDIR /usr/src/app
ARG REACT_APP_API_URL
COPY . .
RUN rm -rf node_modules && yarn install --frozen-lockfile --production
RUN yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]

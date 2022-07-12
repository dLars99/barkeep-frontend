FROM node:14 AS builder
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY . .
RUN rm -rf node_modules && yarn install --frozen-lockfile
RUN yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]

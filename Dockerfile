FROM node:10.11 AS builder

WORKDIR /home/node
COPY . .
RUN chown -R node:node .

USER node

RUN yarn install && yarn build

FROM nginx:mainline-alpine

COPY --from=builder /home/node/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

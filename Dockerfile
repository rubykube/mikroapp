FROM node:10.11

WORKDIR /home/node
COPY . .
RUN chown -R node:node .

USER node
RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]

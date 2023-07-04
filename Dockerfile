FROM node:current-alpine 

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY .  /app

CMD ["yarn", "start"]
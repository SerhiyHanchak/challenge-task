FROM node:16-alpine as development

WORKDIR /app

COPY ./ ./

RUN npm install

RUN apk del build-dependencies

COPY . .

RUN npm run build


FROM node:16-alpine as production

RUN apk add dumb-init

USER node

WORKDIR /app

EXPOSE 3000

CMD ["dumb-init", "node server.js", "./dist"]

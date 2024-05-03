FROM node:latest

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

CMD ["npx", "ng", "serve", "--host","0.0.0.0"]
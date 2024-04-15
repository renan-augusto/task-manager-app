FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npx prisma db push

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
FROM node:20.11.0-bullseye

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD  npm run start:prod
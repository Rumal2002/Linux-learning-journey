FROM node:22-alpine

LABEL maintainer="Rumal Medagedara"
LABEL project="Day 22 Multi-Container Application"
LABEL service="backend"
LABEL version="1.0"

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY server.js ./

EXPOSE 3000

CMD ["npm", "start"]

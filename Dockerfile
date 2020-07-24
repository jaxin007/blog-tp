FROM node:13-alpine3.10

WORKDIR /app

COPY package*.json ./

#RUN npm ci && npm cache clean --force

#COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

FROM node:18

WORKDIR /app

EXPOSE 4173

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["npm", "run", "preview"]
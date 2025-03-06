FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

# RUN npm run db:gen

COPY . ./app

EXPOSE 5001

CMD [ "npm", "run", "dev" ]
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 3002
CMD ["npx","next","dev","-p","3002","-H","0.0.0.0"]

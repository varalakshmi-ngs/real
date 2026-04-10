FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install rollup --force

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "preview", "--", "--port", "80", "--host", "0.0.0.0"]

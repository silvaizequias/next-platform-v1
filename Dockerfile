FROM node:21-alpine3.20

WORKDIR /app
COPY package.json yarn.lock* ./

RUN yarn install
COPY . .

RUN yarn build
COPY .next ./.next

CMD [ "npm", "run", "dev" ]
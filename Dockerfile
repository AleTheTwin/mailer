FROM node:18

COPY . .

RUN npm ci

EXPOSE 443

CMD [ "npm", "run", "start" ]
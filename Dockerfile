FROM node:18

COPY . .

RUN npm ci

EXPOSE 2050

CMD [ "npm", "run", "start" ]
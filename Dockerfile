FROM node:18

COPY . .

RUN npm install

EXPOSE 2050

CMD [ "npm", "run", "start" ]
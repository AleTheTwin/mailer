FROM alethetwin/mailer

COPY . .


CMD [ "npm", "run", "start" ]
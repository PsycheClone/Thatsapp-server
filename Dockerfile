FROM node:boron

# Create app directory
WORKDIR /usr/src/app

COPY wss.js .

RUN npm install ws

EXPOSE 8001
CMD [ "node", "wss.js" ]

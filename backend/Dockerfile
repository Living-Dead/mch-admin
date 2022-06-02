FROM node:12-alpine
RUN apk add python2 make g++
RUN npm install nodemon -g
WORKDIR /home/app
USER node
CMD npm install && nodemon --inspect=0.0.0.0:9229 -r @babel/register -r @babel/polyfill app.js

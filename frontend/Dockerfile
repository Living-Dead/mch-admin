FROM node:12-alpine
RUN apk add python2 make g++
RUN npm install -g @vue/cli --unsafe
WORKDIR /home/app
USER node
CMD npm install; npx vue-cli-service build --watch
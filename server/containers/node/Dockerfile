FROM node:14

ENV APP_ROOT /opt/app/

WORKDIR $APP_ROOT
RUN mkdir -p $APP_ROOT
COPY package*.json $APP_ROOT
RUN npm i --quiet
COPY . $APP_ROOT

EXPOSE 5161

CMD ["npm", "start"]

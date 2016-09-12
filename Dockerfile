FROM node:argon
MAINTAINER theduckening
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install --production
COPY . /usr/src/app
EXPOSE 9901
CMD ["npm", "start"]

FROM node:argon
MAINTAINER theduckening
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install --production
EXPOSE 9901
CMD ["npm", "start"]

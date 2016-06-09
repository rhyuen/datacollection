# FROM ubuntu:latest
# MAINTAINER theduckening
# RUN apt-get update && apt-get install -y nodejs npm
# COPY . /src
# RUN cd /src; npm install --production
# EXPOSE 9901
# CMD cd /src && npm start
#
#
# FROM node:argon
# MAINTAINER theduckening
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# COPY package.json /usr/src/app
# RUN npm install --production
# COPY . /usr/src/app
# EXPOSE 9901
# CMD ["npm", "start"]
#
# FROM centos:centos6
# MAINTAINER theduckening
# RUN yum install -y epel-release
# RUN yum install -y nodejs npm
# COPY package.json /src/package.json
# RUN cd/src; npm install --production
# COPY . /src
# EXPOSE 9901
# CMD ["npm", "start"]

FROM node:argon
MAINTAINER theduckening
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install --production
EXPOSE 9901
CMD ["npm", "start"]

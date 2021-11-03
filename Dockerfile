FROM node:10.13.0-alpine

# Create Directory for the Container
WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package.json .

# Install all Packages
RUN npm install

# Copy all other source code to work directory
ADD . /usr/src/app

ARG REACT_APP_URI="default value 1"
ARG REACT_APP_NODE_ENV="default value 2"

RUN echo "REACT_APP_URI=$REACT_APP_URI" > /usr/src/app/.env
RUN echo "REACT_APP_NODE_ENV=$REACT_APP_NODE_ENV" >> /usr/src/app/.env

# Start
CMD [ "npm", "start" ]
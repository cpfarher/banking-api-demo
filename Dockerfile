FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install --only=production

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait ./wait
RUN chmod +x ./wait

COPY . .
EXPOSE 8080
CMD /usr/src/app/wait && node server.js
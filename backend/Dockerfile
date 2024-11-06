FROM node:20.18

# Dummy build argument for cache invalidation
ARG CACHEBUST=1

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY ./app/package*.json ./

# Install all dependencies
RUN npm install

COPY ./app .

RUN npm run build

# Wait for redis and postgresql to start
ENV WAIT_VERSION 2.11.0
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

# Launching the server in production mode.
CMD ["npm", "run", "start:prod"]

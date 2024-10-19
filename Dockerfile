FROM node:20

WORKDIR /api

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY .. ..

ENTRYPOINT [ "npm","run","start:dev" ]
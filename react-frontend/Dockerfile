FROM node:5

COPY index.js index.js
COPY expressServer.js expressServer.js
COPY package.json package.json

COPY webpack.config.production.js webpack.config.production.js
COPY server/ForwarderService.js server/ForwarderService.js

RUN npm install --production
RUN npm run build

COPY public public

COPY node_modules node_modules

CMD npm run start

EXPOSE 3000

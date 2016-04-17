FROM node:5

COPY index.js index.js
COPY expressServer.js expressServer.js
COPY package.json package.json

COPY server/ForwarderService.js server/ForwarderService.js

COPY public public

COPY node_modules node_modules
COPY webpack.config.production.js webpack.config.production.js

CMD npm run start

EXPOSE 3000

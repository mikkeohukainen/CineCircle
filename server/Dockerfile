FROM node:18-alpine AS build
WORKDIR /home/node/cinecircle
COPY package*.json ./
RUN npm install
COPY migrations ./migrations
COPY src/ ./src/
COPY database.json ./


FROM node:18-alpine
WORKDIR /home/node/cinecircle
RUN chown -R node:node /home/node/cinecircle
COPY --chown=node:node package*.json docker-entrypoint.sh ./
COPY --chown=node:node --from=build /home/node/cinecircle/node_modules ./node_modules
COPY --chown=node:node --from=build /home/node/cinecircle/migrations ./migrations
COPY --chown=node:node --from=build /home/node/cinecircle/src/ ./src/
COPY --chown=node:node database.json ./
USER node

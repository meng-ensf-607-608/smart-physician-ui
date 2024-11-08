FROM node:22.11.0-slim as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:22.11.0-slim
WORKDIR /usr/app
COPY --from=build /app/dist/physician-assistant ./
EXPOSE 4000
CMD ["node", "server/server.mjs"] 

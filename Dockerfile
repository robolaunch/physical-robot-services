FROM node:latest as build-stage
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
FROM node:latest as production-stage
COPY --from=build-stage /app/build /app
COPY --from=build-stage /app/node_modules /node_modules
EXPOSE 8078
ENTRYPOINT [ "node","/app/app.js" ]
FROM node:latest as build-stage
ARG APPLICATION_PORT
ARG ROBOT_PORT
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
FROM node:latest as production-stage
COPY --from=build-stage /app/build /app
EXPOSE 8077
ENTRYPOINT [ "node" , "app/app.js" ]
FROM ros:humble-ros-base as build-stage
COPY . /app
WORKDIR /app
RUN apt-get update && apt-get install -y nodejs npm curl wget
RUN npm install -g n
RUN n stable
RUN . /opt/ros/hubmle/setup.bash && npm install
RUN npm run build
FROM node:latest as production-stage
COPY --from=build-stage /app/build /app
COPY --from=build-stage /app/node_modules /node_modules
EXPOSE 8078
ENTRYPOINT [ "node","/app/app.js" ]
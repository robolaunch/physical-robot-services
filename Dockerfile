FROM ros:humble-ros-base
COPY . /app
WORKDIR /app
RUN apt-get update && apt-get install -y nodejs npm curl wget
RUN npm install -g n
RUN n stable
RUN source /opt/ros/humble/setup.bash && npm install
RUN npm run build
EXPOSE 8078
ENTRYPOINT [ "node","/build/app.js" ]
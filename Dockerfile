FROM ros:humble-ros-base
COPY . /app
WORKDIR /app
RUN apt-get update && apt-get install -y nodejs npm curl wget
RUN npm install -g n
RUN n 18.18.2
RUN /bin/bash -c "source /opt/ros/humble/setup.bash && npm install"
RUN /bin/bash -c "source /opt/ros/humble/setup.bash && npm run build"
EXPOSE 8078
ENTRYPOINT ["/bin/bash", "-c", "source /opt/ros/humble/setup.bash && node /app/build/app.js"]

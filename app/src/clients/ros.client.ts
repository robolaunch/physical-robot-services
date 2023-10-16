import * as rclnodejs from "rclnodejs";

rclnodejs.init();

const rosClient = new rclnodejs.Node("rcnodejs_client");

rosClient.spin();

export default rosClient;

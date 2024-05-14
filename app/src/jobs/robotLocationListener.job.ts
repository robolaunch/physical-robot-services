import rosClient from "../clients/ros.client";
import logger from "../helpers/logger.helper";
import kafkaSender from "../functions/kafkaSender.function";

export default function robotLocationListener() {
  let status = false;

  setInterval(() => {
    status = !status;
  }, 5000);

  rosClient.createSubscription("tf2_msgs/msg/TFMessage", "/tf", (msg: any) => {
    const allTransforms = msg.transforms;
    const baseLink = allTransforms.find((transform: any) => {
      return (
        transform.child_frame_id === "base_footprint" ||
        transform.child_frame_id === "base_link"
      );
    })?.transform;

    if (status && baseLink) {
      console.log(baseLink);

      kafkaSender("robotLocation", JSON.stringify(baseLink));
      logger("[Robot Location Service] Robot location saved.");

      status = !status;
    }
  });
}

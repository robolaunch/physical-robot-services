import getRobotLocation from "../functions/getRobotLocation.function";
import kafkaSender from "../functions/kafkaSender.function";
import rosClient from "../clients/ros.client";

export default async function rosBarcodeListenerJob() {
  try {
    rosClient.createSubscription(
      "std_msgs/msg/String",
      "barcode",
      async (msg: any) => {
        console.log("/barcode", msg);

        if (msg.data) {
          try {
            const message = await JSON.parse(msg.data);

            const location = await getRobotLocation();

            await kafkaSender(
              "barcode",
              JSON.stringify({
                time: Math.floor(+new Date() / 1000),
                sensorId: Number(message.sensorId),
                taskId: message.taskId,
                barcode: message.barcode,
                location_x: message.waypoint.x,
                location_y: message.waypoint.y,
                location_z: message.waypoint.z,
                yaw: message.waypoint.yaw,
              })
            );
          } catch (error) {
            console.error("[rosBarcodeListenerJob] Error of JSON.parse");
          }
        }
      }
    );
  } catch (error) {
    console.error(
      `[rosBarcodeListenerJob] Error of create subscription to topic /barcode`
    );
  }
}

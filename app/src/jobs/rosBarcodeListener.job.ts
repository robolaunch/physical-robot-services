import getRobotLocation from "../functions/getRobotLocation.function";
import kafkaSender from "../functions/kafkaSender.function";
import rosClient from "../clients/ros.client";

export default async function rosBarcodeListenerJob() {
  try {
    rosClient.createSubscription(
      "std_msgs/msg/String",
      "barcode",
      async (msg: any) => {
        if (msg.data) {
          try {
            const message = await JSON.parse(msg.data);

            const location = await getRobotLocation();

            await kafkaSender(
              "barcode",
              JSON.stringify({
                time: Math.floor(+new Date() / 1000),
                scanner_id: message.scanner_id,
                barcode: message.barcode,
                location_x: location.location_x,
                location_y: location.location_y,
                location_z: location.location_z,
              })
            );
          } catch (error) {
            console.log("[rosBarcodeListenerJob] Error of JSON.parse");
          }
        }
      }
    );
  } catch (error) {
    console.log(
      `[rosBarcodeListenerJob] ROS 'barcode' konusunu dinlerken hata oluştu.`
    );
  }
}

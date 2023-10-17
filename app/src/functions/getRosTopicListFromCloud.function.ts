import axios from "axios";
import env from "../providers/environment.provider";

export default async function GetRosTopicListFromCloud() {
  try {
    const { data: response } = await axios.get(
      `http://127.0.0.1:${env.application.port}/topic`
    );

    return response.data;
  } catch (error) {
    console.log(
      `[GetRosTopicListFromCloud] Error while getting ROS topic list.`
    );
    return [];
  }
}

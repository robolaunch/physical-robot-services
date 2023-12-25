import axios from "axios";
import env from "../providers/environment.provider";

export default async function GetRosTopicListFromCloud() {
  try {
    const { data: response } = await axios.get(
      `${env.application.host}:${env.application.port}/topic`
    );

    return response.data;
  } catch (error) {
    console.log(
      `[GetRosTopicListFromCloud] Error while getting ROS topic list.`
    );
    return [];
  }
}

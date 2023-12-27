import axios from "axios";
import env from "../providers/environment.provider";

export default async function GetRosTopicListFromCloud() {
  const url: string = `${env.application.host}:${env.application.port}/topic`;

  try {
    const { data: response } = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(
      "[GetRosTopicListFromCloud] Error while getting ROS topic list."
    );
    return [];
  }
}

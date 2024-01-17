import axios from "axios";
import env from "../providers/environment.provider";
import logger from "../helpers/logger";

export default async function GetRosTopicListFromCloud() {
  const url: string = `${env.application.host}:${env.application.port}/topic`;

  try {
    const { data: response } = await axios.get(url);

    return response.data;
  } catch (error) {
    logger("[GetRosTopicListFromCloud] Error while getting ROS topic list.");
    return [];
  }
}

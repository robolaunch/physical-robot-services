import rosClient from "../clients/ros.client";
import GetRosTopicListFromCloud from "../functions/getRosTopicListFromCloud.function";
import kafkaSender from "../functions/kafkaSender.function";
import {
  setSubscribedRosTopics,
  subscribedRosTopics,
} from "../global/variables.global";
import logger from "../helpers/logger";
import { Topic } from "../types/types";

export default async function rosTopicListenerJob() {
  try {
    const newTopics = await GetRosTopicListFromCloud();

    newTopics?.forEach((topic: Topic) => {
      if (
        !subscribedRosTopics
          .map((topic: Topic) => topic.name)
          .includes(topic.name)
      ) {
        const listener = rosClient.createSubscription(
          topic.type,
          topic.name,
          (msg: any) => {
            if (msg.data) {
              kafkaSender(
                "topic",
                JSON.stringify({
                  time: Math.floor(+new Date() / 1000),
                  name: topic.name,
                  type: topic.type,
                  data: msg.data,
                })
              );
            }
          }
        );
        setSubscribedRosTopics([
          ...subscribedRosTopics,
          {
            ...topic,
            listener: listener,
          },
        ]);
      }
    });

    subscribedRosTopics.forEach((topic: Topic) => {
      if (!newTopics.map((topic: Topic) => topic.name).includes(topic.name)) {
        rosClient.destroySubscription(topic.listener);
        setSubscribedRosTopics(
          subscribedRosTopics.filter(
            (subscribedTopic: Topic) => subscribedTopic.name !== topic.name
          )
        );
      }
    });
  } catch (error) {
    logger(`[rosListenerTopicJob] Error while listening ROS topics.`);
  }
}

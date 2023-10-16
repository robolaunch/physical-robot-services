let subscribedRosTopics: any[] = [];

function setSubscribedRosTopics(topics: string[]) {
  subscribedRosTopics = topics;
}

export { subscribedRosTopics, setSubscribedRosTopics };

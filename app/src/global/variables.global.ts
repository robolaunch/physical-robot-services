export let subscribedRosTopics: any[] = [];

export function setSubscribedRosTopics(topics: string[]) {
  subscribedRosTopics = topics;
}

export const filePath = `/home/${process.env.USER}/.ros/config.json`;

export const rosStoragePath = "/tmp/rosStorage/";

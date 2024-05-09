import {
  rosMapIMAGESender,
  rosMapSaver,
  rosMapYAMLSender,
} from "../functions/rosMap.function";
import rosMapDirPreparation from "./rosMapDirPreparation.job";

function handlePreparation() {
  return new Promise<void>((resolve) => {
    rosMapDirPreparation();
    resolve();
  });
}

export default async function rosMapFlowScheduler() {
  await handlePreparation();

  setInterval(async () => {
    if (await rosMapSaver()) {
      await rosMapIMAGESender();
      await rosMapYAMLSender();
    }
  }, 5000);
}

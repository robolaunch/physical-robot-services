import { exec } from "child_process";
import logger from "../helpers/logger.helper";

export default function rosMapDirPreparation(): void {
  exec(
    "cd /tmp && mkdir rosStorage && chmod 777 rosStorage",

    (error) => {
      if (error) {
        logger(
          error.message.includes("File exists")
            ? "./maps directory already exists"
            : "Getting error while creating directory"
        );
      } else {
        logger("Creating ./maps directory successfully.");
      }
    }
  );
}

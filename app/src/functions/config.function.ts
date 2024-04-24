import { initialConfig } from "../constants/config.constant";
import { filePath } from "../global/variables.global";
import { IConfig } from "../types/types";
import fs from "fs";

export function getConfig(): Promise<IConfig> {
  return new Promise<IConfig>((resolve, reject) => {
    try {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          createConfig(initialConfig)
            .then(() => {
              resolve(initialConfig);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          readConfig()
            .then((config) => {
              resolve(config);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function createConfig(config: IConfig): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      fs.writeFile(filePath, JSON.stringify(config, null, 2), (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function readConfig(): Promise<IConfig> {
  return new Promise<IConfig>((resolve, reject) => {
    try {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(data));
      });
    } catch (error) {
      reject(error);
    }
  });
}

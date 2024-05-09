import { exec } from "child_process";
import { mapPath } from "../global/variables.global";
import logger from "../helpers/logger.helper";
import fs from "fs";
import kafkaSender from "./kafkaSender.function";

export function rosMapSaver(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    exec(
      `ros2 run nav2_map_server map_saver_cli -f ${mapPath}map --fmt png`,
      (_, stdout, stderr) => {
        if (
          stdout?.includes("Map saved") &&
          stderr?.includes("Map saved successfully")
        ) {
          logger("Map saved successfully.");
          resolve(true);
        } else {
          logger("Error of saving map!");
          reject(false);
        }
      }
    );
  }).catch(() => false);
}

export function rosMapIMAGESender() {
  const image = fs.readFileSync(`${mapPath}map.png`);
  kafkaSender("rosmapIMAGE", image);
}

export function rosMapYAMLSender() {
  const yaml = fs.readFileSync(`${mapPath}map.yaml`);
  kafkaSender("rosmapYAML", yaml.toString());
}

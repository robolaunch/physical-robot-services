import { exec } from "child_process";
import { rosStoragePath } from "../global/variables.global";
import logger from "../helpers/logger.helper";
import fs from "fs";
import kafkaSender from "./kafkaSender.function";

export function rosMapSaver(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    exec(
      `ros2 run nav2_map_server map_saver_cli -f ${rosStoragePath}map --fmt png`,
      (_, stdout, stderr) => {
        if (
          stdout?.includes("Map saved") &&
          stderr?.includes("Map saved successfully")
        ) {
          logger("[Robot Map Service] Map saved successfully.");
          resolve(true);
        } else {
          logger("[Robot Map Service] Error of saving map!");
          reject(false);
        }
      }
    );
  }).catch(() => false);
}

export function rosMapIMAGESender() {
  const image = fs.readFileSync(`${rosStoragePath}map.png`);
  kafkaSender("rosmapIMAGE", image);
}

export function rosMapYAMLSender() {
  const yaml = fs.readFileSync(`${rosStoragePath}map.yaml`);
  kafkaSender("rosmapYAML", yaml.toString());
}

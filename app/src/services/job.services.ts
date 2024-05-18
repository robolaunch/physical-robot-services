import { Request, Response } from "express";
import setResponse from "../helpers/setResponse.helper";
import fs from "fs";
import { rosStoragePath } from "../global/variables.global";
import { exec } from "child_process";

async function start(req: Request, res: Response) {
  try {
    const job = req.body;

    fs.writeFileSync(`${rosStoragePath}waypoints.json`, JSON.stringify(job));

    exec(`. /opt/ros/humble/setup.sh && python3 ${rosStoragePath}waypoint.py`);

    setResponse(
      res,
      200,
      "success",
      "Waypoint job has been started successfully."
    );
  } catch (error) {
    setResponse(res, 500, "error", "Internal server error.");
  }
}

async function stop(req: Request, res: Response) {}

export default {
  start,
  stop,
};

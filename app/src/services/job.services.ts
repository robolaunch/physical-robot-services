import { Request, Response } from "express";
import setResponse from "../helpers/setResponse.helper";
import fs from "fs";
import { rosStoragePath } from "../global/variables.global";
import { exec } from "child_process";

async function start(req: Request, res: Response) {
  try {
    const job = req.body;

    fs.writeFileSync(
      `${rosStoragePath}waypoints.json`,
      JSON.stringify(job?.waypoints)
    );

    console.log(job.waypoints);

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

async function stop(req: Request, res: Response) {
  try {
    exec(
      `. /opt/ros/humble/setup.sh && ros2 lifecycle set /bt_navigator deactivate && ros2 lifecycle set /bt_navigator  `
    );

    setResponse(
      res,
      200,
      "success",
      "Waypoint job has been stopped successfully."
    );
  } catch (error) {
    setResponse(res, 500, "error", "Internal server error.");
  }
}

export default {
  start,
  stop,
};

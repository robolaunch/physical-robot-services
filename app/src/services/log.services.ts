import getRosLogs from "../functions/getRosLogs.function";
import setResponse from "../helpers/setResponse.helper";
import { Request, Response } from "express";
import { RobotLog } from "../types/types";
import fs from "fs";

async function get(req: Request, res: Response) {
  try {
    const files: RobotLog[] | null = await getRosLogs();

    if (files) {
      setResponse(res, 200, "ROS logs retrieved successfully.", files);
    } else {
      setResponse(res, 500, "Error while getting ROS logs.", null);
    }
  } catch (error) {
    setResponse(res, 500, "An error occurred", null);
  }
}

async function post(req: Request, res: Response) {
  fs.readFile(req.body.path, "utf8", function (err: any, data: any) {
    if (err) {
      setResponse(res, 500, "Error while getting ROS logs.", null);
      return;
    }
    setResponse(res, 200, "ROS logs retrieved successfully.", data);
  });
}

async function remove(req: Request, res: Response) {
  try {
    const files: RobotLog[] | null = await getRosLogs();

    files?.map((file) => {
      try {
        fs.rmSync(`/home/${process.env.USER}/.ros/log/${file.name}`);
      } catch (error) {
        throw error;
      }
    });

    setResponse(res, 200, "ROS logs removed successfully.", null);
  } catch (error) {
    setResponse(res, 500, "Error while removing ROS logs.", null);
  }
}

async function removeWithName(req: Request, res: Response) {
  try {
    fs.rmSync(`/home/${process.env.USER}/.ros/log/${req.params.name}`);
    setResponse(res, 200, "ROS log removed successfully.", null);
  } catch (error) {
    setResponse(res, 500, "Error while removing ROS log.", null);
  }
}

export default {
  get,
  post,
  remove,
  removeWithName,
};

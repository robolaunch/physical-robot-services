import { createConfig, getConfig } from "../functions/config.function";
import setResponse from "../helpers/setResponse.helper";
import { Request, Response } from "express";

async function get(req: Request, res: Response) {
  try {
    const config: any = await getConfig();

    if (config) {
      setResponse(res, 200, "ROS logs retrieved successfully.", config);
    } else {
      setResponse(res, 500, "Error while getting ROS logs.", null);
    }
  } catch (error) {
    setResponse(res, 500, "An error occurred", null);
  }
}

async function post(req: Request, res: Response) {
  try {
    await createConfig(req.body.config);
    setResponse(res, 200, "ROS logs updated successfully.", null);
  } catch (error) {
    setResponse(res, 500, "Error while removing ROS logs.", null);
  }
}

export default {
  get,
  post,
};

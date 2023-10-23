import { Request, Response } from "express";
import setResponse from "../helpers/setResponse.helper";
import getRosLogs from "../functions/getRosLogs.function";

async function get(req: Request, res: Response) {
  const files = await getRosLogs();

  if (files) {
    setResponse(res, 200, "ROS logs retrieved successfully.", files);
  } else {
    setResponse(res, 500, "Error while getting ROS logs.", null);
  }
}

export default {
  get,
};

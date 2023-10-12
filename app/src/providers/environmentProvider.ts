import { Environments } from "../types/types";
import dotenv from "dotenv";

dotenv.config();

const env: Environments = {
  robot: {
    port: parseInt(process.env.ROBOT_PORT!),
  },
};

export default env;

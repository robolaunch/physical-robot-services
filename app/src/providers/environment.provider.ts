import { Environments } from "../types/types";
import dotenv from "dotenv";

dotenv.config();

const env: Environments = {
  application: {
    port: parseInt(process.env.APPLICATION_PORT!),
  },

  robot: {
    port: parseInt(process.env.ROBOT_PORT!),
  },
};

export default env;

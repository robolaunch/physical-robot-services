import { Environments } from "../types/types";
import dotenv from "dotenv";

dotenv.config();

const env: Environments = {
  kafka: {
    host: process.env.KAFKA_HOST!,
    port: parseInt(process.env.KAFKA_PORT!),
  },
  application: {
    host: process.env.APPLICATION_HOST!,
    port: parseInt(process.env.APPLICATION_PORT!),
  },
  robot: {
    port: parseInt(process.env.ROBOT_PORT!),
  },
};

export default env;

import { IConfig } from "../types/types";

export const initialConfig: IConfig = {
  log: {
    paths: [`/home/${process.env.USER}/.ros/log/`],
  },
};

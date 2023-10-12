import { ITopicConfig } from "kafkajs";

export type KafkaTopicConfig = {
  validateOnly?: boolean;
  waitForLeaders?: boolean;
  timeout?: number;
  topics: ITopicConfig[];
};

export type Environments = {
  robot: {
    port: number;
  };
};

export type Barcode = {
  scanner_id: number;
  time: number;
  barcode: string;
  location_x: number;
  location_y: number;
  location_z: number;
};

export type Task = {
  task_id: string;
  task_name: string;
  task_json: string;
};

import { ITopicConfig } from "kafkajs";
import { MessageTypeClassName } from "rclnodejs";

export type KafkaTopicConfig = {
  validateOnly?: boolean;
  waitForLeaders?: boolean;
  timeout?: number;
  topics: ITopicConfig[];
};

export type Environments = {
  application: {
    port: number;
  };
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

export type Topic = {
  type: MessageTypeClassName;
  name: string;
  listener?: any;
};

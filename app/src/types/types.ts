import { ITopicConfig } from "kafkajs";
import { MessageTypeClassName } from "rclnodejs";

export type KafkaTopicConfig = {
  validateOnly?: boolean;
  waitForLeaders?: boolean;
  timeout?: number;
  topics: ITopicConfig[];
};

export type Environments = {
  kafka: {
    host: string;
    port: number;
  };
  application: {
    host: string;
    port: number;
  };
  robot: {
    port: number;
  };
};

export type Barcode = {
  sensorId: number;
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

export type RobotLog = {
  name: string;
  isDirectory: boolean;
  path: string;
  size: number;
  createdAt: number;
  updatedAt: number;
};

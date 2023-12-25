import { Kafka } from "kafkajs";
import env from "../providers/environment.provider";

const kafkaClient = new Kafka({
  clientId: "robolaunch",
  brokers: [`${env.kafka.host}:${env.kafka.port}`],
});

export default kafkaClient;

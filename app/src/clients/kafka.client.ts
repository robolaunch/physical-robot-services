import { Kafka } from "kafkajs";

const kafkaClient = new Kafka({
  clientId: "robolaunch",
  brokers: ["localhost:9092"],
});

export default kafkaClient;

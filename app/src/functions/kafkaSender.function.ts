import kafkaClient from "../clients/kafka.client";

export default async function kafkaSender(
  kafkaChannel: string,
  kafkaMessage: any
) {
  const producer = kafkaClient.producer();

  await producer.connect();
  await producer.send({
    topic: kafkaChannel,
    messages: [
      {
        value: kafkaMessage,
      },
    ],
  });
  await producer.disconnect();
}

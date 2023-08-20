import { connect } from "amqplib/callback_api";
import { initializeMiddlewares } from "./middlewares";
import express, { Application, Request, Response } from "express";

import config from "../config";

const AMQP_URL = config.rabbitMQ.url; // RabbitMQ URL
const QUEUE_NAME = config.rabbitMQ.queueServer; // Name queue
const PORT = config.portServer;

const app: Application = express();

app.use(express.json());

app.post("/tasks", (req: Request, res: Response) => {
  const task = req.body.task;

  connect(AMQP_URL, (error, connection) => {
    if (error) {
      return res.status(500).json({ error: "Failed to connect to RabbitMQ" });
    }

    connection.createChannel((error, channel) => {
      if (error) {
        return res.status(500).json({ error: "Failed to create channel" });
      }

      channel.assertQueue(QUEUE_NAME, {
        durable: true,
      });

      channel.sendToQueue("WORKER", Buffer.from(task));

      channel.consume(
        QUEUE_NAME,
        (message) => {
          if (message !== null) {
            const task = message.content.toString();

            res.status(200).json({ message: task });

            channel.ack(message);
          }
        },
        {
          noAck: false,
        }
      );
      return res;
    });
  });
});

// Middleware initialization
initializeMiddlewares(app);

// Start the worker
app.listen(PORT, () => {
  console.log(`Worker is running on port ${PORT}`);
});

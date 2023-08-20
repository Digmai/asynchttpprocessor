import express, { Application } from "express";
import { connect } from "amqplib/callback_api";
import { initializeMiddlewares } from "./middlewares";
import { processTask } from "./controllers";

import config from "../config";

const AMQP_URL = config.rabbitMQ.url; // RabbitMQ URL
const QUEUE_NAME = config.rabbitMQ.queueWrker; // Name queue
const PORT = config.portWrker;

const app: Application = express();

connect(AMQP_URL, (error, connection) => {
  if (error) {
    throw new Error(`Failed to connect to RabbitMQ: ${error}`);
  }

  connection.createChannel((error, channel) => {
    if (error) {
      throw new Error(`Failed to create channel: ${error}`);
    }

    channel.assertQueue(QUEUE_NAME, {
      durable: true,
    });

    channel.prefetch(1);

    console.log("Worker is waiting for tasks...");

    channel.consume(
      QUEUE_NAME,
      (message) => {
        if (message !== null) {
          const task = message.content.toString();
          processTask(task); // Process the task

          channel.sendToQueue(
            "SERVER",
            Buffer.from(`Task ${task} sent successfully`)
          );
          channel.ack(message);
        }
      },
      {
        noAck: false,
      }
    );
  });
});

// Middleware initialization
initializeMiddlewares(app);

// Start the worker
console.log(`Worker is running on port ${PORT}`);

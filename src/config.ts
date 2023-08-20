export default {
  portServer: 3000, // Порт сервера
  portWrker: 3001, // Порт воркера
  rabbitMQ: {
    url: "amqp://localhost",
    queueWrker: "WORKER",
    queueServer: "SERVER",
  },
};

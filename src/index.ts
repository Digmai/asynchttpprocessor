import { fork } from "child_process";

// Start the server
const serverProcess = fork("./server/server.ts");

// Start the worker
const workerProcess = fork("./worker/worker.ts");

// Handle exit events
const handleExit = (code: number) => {
  console.log(`Child process exited with code ${code}`);
  process.exit(code);
};

// Handle server process exit
serverProcess.on("exit", handleExit);

// Handle worker process exit
workerProcess.on("exit", handleExit);

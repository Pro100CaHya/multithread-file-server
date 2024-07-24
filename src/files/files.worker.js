import { parentPort } from "node:worker_threads";

let counter = 0;

for (let i = 0; i < 10e8; i++) {
    counter += 1;
}

for (let i = 0; i < 10e8; i++) {
    counter += 1;
}

parentPort.postMessage(counter);
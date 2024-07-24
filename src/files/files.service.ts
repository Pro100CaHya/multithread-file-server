import { Worker} from "node:worker_threads";

class FilesService {
    constructor() {}

    public getFileInfo() {
        // return new Promise((resolve, reject) => {
        //     const fileWorker = new Worker("./src/files/files.worker.js", {
        //         workerData: {}
        //     });

        //     fileWorker.on("message", (data) => {
        //         resolve(data);
        //     });

        //     fileWorker.on("error", (error) => {
        //         reject(error);
        //     });

        //     fileWorker.on("exit", (code) => {
        //         if (code !== 0) {
        //             reject(new Error(`Worker stopped with exit code ${code}`));
        //         }
        //     });
        // });
        let counter = 0;

        for (let i = 0; i < 10e8; i++) {
            counter += 1;
        }

        for (let i = 0; i < 10e8; i++) {
            counter += 1;
        }

        return counter;
    }
}

export {
    FilesService
}
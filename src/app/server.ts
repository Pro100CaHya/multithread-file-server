import bodyParser from "body-parser";
import express, { Application } from "express";
import { Controller } from "src/interfaces";

class Server {
    private readonly app: Application;
    private readonly port: number;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use("/api", controller.router);
        });
    }

    public async startServer() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}... Process with PID ${process.pid}`);
        });
    }
}

export {
    Server
}
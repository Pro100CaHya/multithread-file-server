import cluster from "cluster";
import os from "os";

import { Server } from "./server";
import { FilesController } from "src/file";
import { postgresConfig, PostgresService } from "src/postgres";

class Cluster {
    private readonly server: Server;
    private readonly postgresService: PostgresService;

    constructor(processes: number) {
        this.postgresService = new PostgresService(postgresConfig);

        this.server = new Server([
            new FilesController(
                this.postgresService
            )
        ], Number(process.env.PORT) || 3000);

        this.initializeProcesses(processes);
    }

    private async initializeProcesses(processes: number) {
        if (processes > os.cpus().length || processes < 1) {
            throw new Error(`Too many processes, processes must be between 1 and ${os.cpus().length}`);
        }
        
        if (cluster.isPrimary) {
            for (let i = 0; i < processes; i++) {
                try {
                    console.log(`Execute test SQL SELECT 1+1`);
                    await this.postgresService.testConnection();
                    console.log(`Successfully connected to Postgres. Starting server...`);
                } catch (error) {
                    console.log(`Error connecting to Postgres. Exiting... Error: ${error}`);
                    process.exit(1);
                }

                cluster.fork();
            }

            cluster.on("exit", () => {
                console.log(`Process with PID ${process.pid} died... Creating new process`);
    
                cluster.fork();
            });
        } else {
            this.server.startServer();
        }
    }
}

export {
    Cluster
}
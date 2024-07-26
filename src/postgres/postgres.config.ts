import { PostgresConfig } from "./postgres.interface";
import { config } from "dotenv";

config();

const postgresConfig: PostgresConfig = {
    host: process.env.POSTGRES_HOST || 'localhost',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DB || 'postgres',
    port: Number(process.env.POSTGRES_PORT) || 5432
}

export {
    postgresConfig
}
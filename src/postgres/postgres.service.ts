import { Pool, QueryResult } from "pg";
import { PostgresConfig } from "./postgres.interface";

class PostgresService {
    private pool: Pool;

    constructor(config: PostgresConfig) {
        this.pool = new Pool(config);
    }

    public async execQuery(query: string, params: string[] = []): Promise<QueryResult> {
        return await this.pool.query(query, params);
    }

    public async testConnection(): Promise<QueryResult> {
        return await this.execQuery("SELECT 1+1");
    }
}

export {
    PostgresService
}
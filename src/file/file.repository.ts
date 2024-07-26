import { PostgresService } from "src/postgres";
import { QueryResult } from "pg";

import { CreateFileDto } from "./dto/create-file.dto";
import { FileMapper } from "./file.mapper";

class FilesRepository {
    private postgresService: PostgresService;

    constructor(postgresService: PostgresService) {
        this.postgresService = postgresService;
    }

    public async createFile(createFileDto: CreateFileDto) {
        const {
            name,
            extension,
            mimeType,
            size
        } = createFileDto;

        const queryResult = await this.postgresService.execQuery(
            `
                INSERT INTO "files" ("name", "extension", "mime_type", "size", "updated_at")
                VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
                RETURNING *;
            `,
            [
                name,
                extension,
                mimeType,
                String(size)
            ]
        );

        return FileMapper.toDomain(queryResult.rows[0]);
    }
}

export {
    FilesRepository
}
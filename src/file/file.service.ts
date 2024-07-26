import { PostgresService } from "src/postgres";
import { CreateFileDto } from "./dto/create-file.dto";
import { FilesRepository } from "./file.repository";

class FilesService {
    private fileRepository: FilesRepository;

    constructor(postgresService: PostgresService) {
        this.fileRepository = new FilesRepository(postgresService);
    }

    public async uploadFile(uploadFileDto: CreateFileDto) {
        return await this.fileRepository.createFile(
            uploadFileDto
        );
    }
}

export {
    FilesService
}
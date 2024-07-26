import { Router, Request, Response, NextFunction } from "express";
import { extname } from "path";
import { FilesService } from "./file.service";
import { PostgresService } from "src/postgres";

import { uploadFiles } from "src/middlewares/upload-files";
import { CreateFileDto } from "./dto/create-file.dto";

class FilesController {
    public path = "/files";
    public router = Router();
    private fileService: FilesService;

    constructor(postgresService: PostgresService) {
        this.fileService = new FilesService(postgresService);

        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(`${this.path}/upload`, uploadFiles.single("file"), this.uploadFile);
    }

    private uploadFile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                size,
                mimetype: mimeType,
                filename: name
            } = req.file;

            const uploadFileDto: CreateFileDto = {
                size,
                mimeType,
                name,
                extension: extname(name)
            }

            const createdFile = await this.fileService.uploadFile(uploadFileDto);

            res.status(200)
                .json({
                    ...createdFile
                })
        } catch (error) {
            console.log(error);
            res.status(500)
                .json({
                    error   
                });
        }
    }
}

export {
    FilesController
}
import { Router, Request, Response } from "express";
import { FilesService } from "./files.service";

class FilesController {
    public path = "/files";
    public router = Router();
    private fileService = new FilesService();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(`${this.path}`, this.getFileInfo);
    }

    private getFileInfo = async (req: Request, res: Response) => {
        try {
            const fileInfo = await this.fileService.getFileInfo();

            res
                .status(200)
                .json({
                    fileInfo
                });
        } catch (error) {
            throw error;
        }
    }
}

export {
    FilesController
}
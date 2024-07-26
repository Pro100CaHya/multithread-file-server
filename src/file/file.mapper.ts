import { FilePostgres, File } from "./file.interface";

class FileMapper {
    public static toDomain(raw: FilePostgres): File {
        return {
            id: raw.id,
            name: raw.name,
            extension: raw.extension,
            mimeType: raw.mime_type,
            size: raw.size,
        }
    }
}

export {
    FileMapper
}
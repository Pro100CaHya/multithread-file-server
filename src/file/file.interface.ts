export interface File {
    id: number;
    name: string;
    extension: string;
    mimeType: string;
    size: number;
}

export interface FilePostgres {
    id: number;
    name: string;
    extension: string;
    mime_type: string;
    size: number;
    created_at: string;
    updated_at: string;
}
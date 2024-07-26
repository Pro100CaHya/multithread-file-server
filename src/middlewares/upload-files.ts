import multer from "multer";
import { extname } from "path";
import { UPLOAD_FOLDER } from "src/config/constants";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_FOLDER);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const uploadFiles = multer({
    fileFilter(req, file, callback) {
        const ext = extname(file.originalname);

        if (ext !== ".txt") {
            return callback(new Error("Only txt files are allowed!"));
        }

        callback(null, true);
    },
    limits: { fieldSize: 10 * 1024 * 1024 },
    storage
});

export {
    uploadFiles
}
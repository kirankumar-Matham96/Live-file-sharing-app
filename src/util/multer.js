import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

const storage = new GridFsStorage({
  url: process.env.DB_URL,
  file: (req, file) => {
    return {
      filename: `${Date.now()}~${file.originalname}`,
      bucketName: "uploads",
    };
  },
});

export const upload = multer({ storage });

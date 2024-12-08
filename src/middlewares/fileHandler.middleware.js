import { upload } from "../util/multer.js";

class HandleFiles {
  singleFile = (req, res, next) => {
    try {
      upload.single("file");
      res
        .status(200)
        .json({ success: true, message: "file uploaded", file: req.file });
    } catch (error) {
      next(error);
    }
  };
  setOfFile = upload.array("files", 5);
}

export default new HandleFiles();

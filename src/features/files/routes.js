import { Router } from "express";
import handleFiles  from "../../middlewares/fileHandler.middleware.js";

export const fileRouter = Router();

fileRouter.post("/add-file", handleFiles.singleFile);

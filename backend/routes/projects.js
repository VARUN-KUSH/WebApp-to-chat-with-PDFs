import { Router } from "express";
import {upload} from "../middleware/multer.middleware.js"
import {processFilesandsaveinpostgres} from "../controllers/file.js"
// import {multer} from "multer"

const router = Router()
// , description, pdfFile
router.route("/createproject").post( upload.single('file'), processFilesandsaveinpostgres)
router.route("/startchat").post()

export default router

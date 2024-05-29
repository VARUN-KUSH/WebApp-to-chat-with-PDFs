import { Router } from "express";
import {chathandletollm} from '../controllers/chathandling.js';

const router = Router();
router.route("/startquery").post(chathandletollm)

export default router;
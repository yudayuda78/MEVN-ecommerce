import express from "express";
import { getSetting } from "../controllers/settingController.js";

const router = express.Router()

router.get('/getsetting', getSetting)


export default router
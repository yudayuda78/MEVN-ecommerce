import express from "express";
import { getSetting, updateSetting } from "../controllers/settingController.js"
import { uploadImages } from "../middleware/imageSettingMiddleware.js";

const router = express.Router()

router.get('/getsetting', getSetting)
router.patch('/updatesetting', uploadImages, updateSetting)



export default router
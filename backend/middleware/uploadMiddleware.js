import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/")
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage })

export const uploadImages = upload.array("image[]", 10)
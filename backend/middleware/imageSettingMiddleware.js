import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/settings")
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage })

export const uploadImages = upload.fields([
  { name: 'icon', maxCount: 1 },
  { name: 'logo', maxCount: 1 }
])
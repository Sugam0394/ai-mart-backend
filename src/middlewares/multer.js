import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage ,
    limits : {fileSize : 2 * 1024 * 1024} ,
    fileFilter : (req , file , cb) => {
        if (file.mimetype.startsWith('./public/temp')) {
            cb(null , true)
        } else {
           cb (new Error('only image files are allowed') , false) 
        }
    }
})

export default upload
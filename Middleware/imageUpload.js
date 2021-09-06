const multer = require("multer");

const upload = multer({
    // dest: "./Images",
    limit: {
        fileSize: 1.5*1024*1024,
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("Invalid file type"))
        }
        cb(undefined, true)
    }
});

module.exports = upload;
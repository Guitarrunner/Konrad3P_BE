const multer = require("multer")
const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
      req.fileName = `${file.originalname}`
      req.filePath = `${Date.now()}-${file.originalname}`
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
const uploadFile = multer({ storage: storage }).single("file")
module.exports=uploadFile

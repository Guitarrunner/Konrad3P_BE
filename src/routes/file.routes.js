const FileService = require("../services/file.service")
const express = require("express");
const uploadFile = require("../middleware/upload.middleware");
const fileRouter = express.Router();

fileRouter.post("/",uploadFile)
fileRouter.route("/")
.post(async(req, res) => {
    let filePath=(`../../upload/${req.filePath}`)
    res.download(`Konrad/serverLab/${filePath}`);
    // let newFile = require(`../../upload/${req.filePath}`)
    // let file = await FileService.postFile({name:req.fileName,file: newFile});

    // if(file.status){
    //     res.status(200).send(file.data) 
    //   }
    // else{
    //     res.status(400).send("error") 
    // }
})
.get(async(req, res) => {
    let files = await FileService.getAll();
    if(files.status){
        res.status(200).send(files.data) 
      }
      else{
          res.status(403).send("Not found")
      }
})
module.exports=fileRouter

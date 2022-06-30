//--------------------------------- IMPORTS ----------------------------------//

const express = require("express");
const uploadFile = require("../middleware/upload.middleware");

//--------------------------------- FUNCTIONS ----------------------------------//

const fileRouter = express.Router();

fileRouter.post("/",uploadFile);
fileRouter.route("/")
.post(async(req, res) => {
    let filePath=(`../../upload/${req.filePath}`);
    res.status(200).send({message:filePath});
})

fileRouter.route("/:filePath")
.get(async(req, res) => {
    let filePath=(`../../upload/${req.params.filePath}`);
    res.status(200).download(`FinalProject/Backend/${filePath}`);
})

module.exports=fileRouter

//--------------------------------- IMPORTS ----------------------------------//

const UserService = require("../services/log.service")
const express = require("express");

//--------------------------------- FUNCTIONS ----------------------------------//
const signupRouter = express.Router();

signupRouter.route('/')
.post(async(req, res) => {
    let body =req.body;
    let user = await UserService.postUser(body);
    if (user.status){
        res.status(200).send({message:user.message})}
    else{
        res.status(403).send({message:user.message.message})
    }
})

.get(async(req, res) => {
    let users = await UserService.getAll();
    if (users.status){
        res.status(200).send({message:users.message})}
    else{
        res.status(403).send({message:users.message})
    }
})
module.exports = signupRouter;
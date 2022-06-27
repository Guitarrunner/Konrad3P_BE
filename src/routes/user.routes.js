//--------------------------------- IMPORTS ----------------------------------//

const UserService = require("../services/user.service")
const express = require("express");

//--------------------------------- FUNCTIONS ----------------------------------//
const userRouter = express.Router();

userRouter.route("/")
.get(async(req, res) => {
    let users = await UserService.getAll();
    if (users.status){
        res.status(200).send({message:users.message})}
    else{
        res.status(403).send({message:users.message})
    }
})

userRouter.route('/:id')
.get(async(req, res) => {
    let index = req.params.id;
    let user = await UserService.getById(index);
    if(user.status){
        res.status(200).send(user.message);
    }
    else{
        res.status(404).send(user.message)
    }
})

.put(async(req, res) => {
    let body =req.body;
    let index = req.params.id;
    let user = await UserService.updateUser(body,index);
    if(user.status){
        res.status(200).send(user.message);
    }
    else{
        res.status(404).send(user.message)
    }
})

.delete(async(req, res) => {
    let index = req.params.id;
    let user = await UserService.deleteUser(index);
    if(user.status){
        res.status(200).send(user.message);
    }
    else{
        res.status(404).send(user.message)
    }
  })

module.exports = userRouter;
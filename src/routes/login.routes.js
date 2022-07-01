//--------------------------------- IMPORTS ----------------------------------//

const UserService = require("../services/log.service")
const express = require("express");

//--------------------------------- FUNCTIONS ----------------------------------//
const loginRouter = express.Router();

loginRouter.route('/')
.post(async(req, res) => {
    let email =req.body.email;
    let password =req.body.password;
    let token = await UserService.getByEmail(email,password);
    if(token.status){
        res.status(200).send({token:token.message, id: token.id});
    }
    else{
        res.status(403).send({token:null,message:token.message});
        
    }
})

module.exports = loginRouter;
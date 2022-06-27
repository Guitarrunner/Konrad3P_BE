const UserService = require("../services/user.service")
const express = require("express");
const loginRouter = express.Router();

loginRouter.route('/')
.post(async(req, res) => {
    let email =req.body.email;
    let password =req.body.password;
    let token = await UserService.getByEmail(email,password);
    if(token.status){
        res.status(200).send({token:token.message});
    }
    else{
        res.status(403).send({token:null,message:token.message});
        
    }
})

module.exports = loginRouter;
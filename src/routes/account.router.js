//--------------------------------- IMPORTS ----------------------------------//

const AccountService = require("../services/account.service")
const express = require("express");

//--------------------------------- FUNCTIONS ----------------------------------//
const accountRouter = express.Router();


accountRouter.route("/")
.get(async(req, res) => {
    let accounts = await AccountService.getAll();
    if (accounts.status){
        res.status(200).send({message:accounts.message})}
    else{
        res.status(403).send({message:accounts.message})
    }
})

accountRouter.route('/:acc')
.post(async(req, res) => {
    let name =req.body.name;
    let type =req.body.type;
    let id = req.params.acc
    let account = await AccountService.addAccount(id,name,type);
    if(account.status){
        res.status(200).send({message:account.message});
    }
    else{
        res.status(403).send({message:account.message});
        
    }
})
.delete(async(req, res) => {
    let acc = parseInt(req.params.acc);
    let account = await AccountService.deleteAccount(acc);
    if(account.status){
        res.status(200).send(account.message);
    }
    else{
        res.status(404).send(account.message)
    }
  })

module.exports = accountRouter;
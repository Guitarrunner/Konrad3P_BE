//--------------------------------- IMPORTS ----------------------------------//

const TransactionService = require("../services/transaction.service")
const express = require("express");

//--------------------------------- FUNCTIONS ----------------------------------//
const transactionRouter = express.Router();

transactionRouter.route('/transfer')
.post(async(req, res) => {
    let toDebit = parseInt(req.body.toDebit);
    let toCredit = parseInt(req.body.toCredit);
    let amount = parseInt(req.body.amount);
    let response = await TransactionService.trasnferMoney(toDebit,toCredit,amount);
    if(response.status){
        res.status(200).send({message:response.message});
    }
    else{
        res.status(403).send({message:response.message});
        
    }
})

transactionRouter.route('/service')
.post(async(req, res) => {
    let account = parseInt(req.body.account);
    let type = req.body.type;
    let response = await TransactionService.payService(account,type);
    if(response.status){
        res.status(200).send({message:response.message});
    }
    else{
        res.status(403).send({message:response.message});
        
    }
})

module.exports = transactionRouter;
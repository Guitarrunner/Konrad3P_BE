//--------------------------------- MODELS ----------------------------------//

const User = require("../models/user.model");

//--------------------------------- IMPORTS ----------------------------------//

const getUserByAccount = require("../helpers/getUserByAccount");
const listServices = require("../custom/services.json")
const updateAmount = require("../helpers/updateAmount");
const UserService = require("../services/user.service");

//--------------------------------- FUNCTIONS ----------------------------------//

exports.trasnferMoney = async (toDebit, toCredit, amount) => {
  let accToDebit = await getUserByAccount(toDebit);
  let accToCredit = await getUserByAccount(toCredit);

  if (!accToCredit || !accToDebit) {
    return { status: false, message: "Account not found" };
  } 

  else {
    if (accToDebit.accounts.filter((account) => account.IBAN === toDebit)[0].amount < amount) {
        return { status: false, message: "Insufficient funds" };
    }
     
    else {
        let newAccDebit = accToDebit.accounts;
        newAccDebit = updateAmount(newAccDebit,toDebit,amount,false);

        let newAccCredit = accToCredit.accounts;
        let type = accToDebit.accounts.filter((account) => account.IBAN === toDebit)[0].type;
        newAccCredit = updateAmount(newAccCredit,toCredit,amount,true,type);

        let logDebit = [...accToDebit.log]
        logDebit.push({type:"debit",amount:amount,date:(new Date()).toUTCString()})
        let logCredit = [...accToCredit.log]
        logCredit.push({type:"credit",amount:amount,date:(new Date()).toUTCString()})

        await User.findByIdAndUpdate(
            accToDebit._id,
            { accounts: newAccDebit, log: logDebit },
            {
            returnDocument: "after",
            runValidators: true,
            }
        );

        await User.findByIdAndUpdate(
        accToCredit._id,
        { accounts: newAccCredit , log: logCredit},
        {
            returnDocument: "after",
            runValidators: true,
        }
        );
        return { status: true, message: "Transaction done!" };
    }
  }
};

exports.payService = async(account,typeService) =>{
  let user = await getUserByAccount(account);
  let index = user.services.indexOf(typeService);
  let service = listServices.filter( service => service.name === typeService)[0];
  let type = user.accounts.filter((acc) => acc.IBAN === account)[0].type;
  let amount;

  if (index === -1) {
    return { status: false, message: "Service not found" };
  } 
  else {
    type === "US" 
      ? amount = service.value/process.env.COMPRA
      : amount = service.value;
    if (user.accounts.filter((acc) => acc.IBAN === account)[0].amount < amount) {
      return { status: false, message: "Insufficient funds" };
    }
    else{
      let newAccDebit = user.accounts;
      newAccDebit = updateAmount(newAccDebit, account, amount, false);

      let logDebit = [...user.log];
      let updateServices = [...user.services];

      updateServices.splice(index,1)
      logDebit.push({
        type: `debit - service - ${typeService}`,
        amount: amount,
        date: new Date().toUTCString(),
      });

      await User.findByIdAndUpdate(
        user._id,
        { accounts: newAccDebit, log: logDebit ,services: updateServices},
        {
          returnDocument: "after",
          runValidators: true,
        }
      );
      return { status: true, message: "Transaction done!" };
    }
  }
}
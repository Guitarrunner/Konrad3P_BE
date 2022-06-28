const User = require("../models/user.model");

async function getUserByAccount(accNumber) {
  const users = await User.find();
  let acc;
  users.forEach(user => {
      let flag = false;
      
      user.accounts.forEach(account => {
          if( account.IBAN === accNumber){
              flag=true;
          }
      })
      if(flag) {
          acc = user;  
      }
  });
  return acc;
}

module.exports = getUserByAccount;

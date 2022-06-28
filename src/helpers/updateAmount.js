function updateAmount(updateAcc, accNumber, amount,flag,type) {
    updateAcc.forEach((account) => {
    if (account.IBAN === accNumber) {
        if(flag){
            if(account.type===type){
                account.amount = account.amount + amount
            }
            else{
                type==="CR" 
                ? account.amount =account.amount + amount/process.env.COMPRA 
                : account.amount =account.amount + amount*process.env.VENTA
            }
        }
        else{
            account.amount = account.amount - amount;
        }
      
    }
  });
  return updateAcc;
}

module.exports = updateAmount;

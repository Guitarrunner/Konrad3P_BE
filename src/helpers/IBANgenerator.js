const Account = require("../models/account.model");

async function ibanGenerator(){
    let IBAN =  Math.floor(Math.random() * (90000000000000000000 -1)) + 10000000000000000000;
    const accounts = await Account.find();
    let flag=true;
    while(flag){
        accounts.forEach(account => {
            if(account.IBAN === IBAN){
                IBAN =  Math.floor(Math.random() * (90000000000000000000 -1)) + 10000000000000000000;
                flag=false
            }
        });
        if (!flag){
            flag=true
        }
        else{
            flag=false
        }
    }
    return IBAN
}

module.exports = ibanGenerator;
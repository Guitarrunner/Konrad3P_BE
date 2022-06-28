const Account = require("../models/account.model");
const ibanGenerator = require("./IBANgenerator");
const generateRandomIntegerInRange = require("./randomMoney");

async function newAccounts(fullName) {
    const dollar = generateRandomIntegerInRange(0, 1000);
    const dollarIBAN = await ibanGenerator()
    const usAccount = new Account({name:"Main US",holder: fullName, type:"US", amount:dollar, IBAN: dollarIBAN})
    await usAccount.save()
    const colones = generateRandomIntegerInRange(0, 100000);
    const colonesIBAN  = await ibanGenerator()
    const crAccount = new Account({name:"Main CR",holder: fullName, type:"CR", amount:colones, IBAN: colonesIBAN})
    await crAccount.save()
    return [usAccount,crAccount]
}

module.exports = newAccounts;
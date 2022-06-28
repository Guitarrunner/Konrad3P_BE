//--------------------------------- MODELS ----------------------------------//

const Account = require("../models/account.model");
const User = require("../models/user.model");

//--------------------------------- IMPORTS ----------------------------------//

const getUserByAccount = require("../helpers/getUserByAccount");
const ibanGenerator = require("../helpers/IBANgenerator");

//--------------------------------- FUNCTIONS ----------------------------------//

/*
Get All Accounts
params: none
return: List with all accounts
*/
exports.getAll = async () => {
  try {
    const accounts = await Account.find();
    return { status: true, message: accounts };
  } catch (err) {
    return { status: false, message: err };
  }
};

/*
Add Account
params: user's id, account's name, account's type
return: New account
*/

exports.addAccount = async (id, name, type) => {
  const IBAN = await ibanGenerator();

  try {
    const user = await User.findById(id);
    const newAccount = new Account({
      name: name,
      holder: user.fullName,
      type: type,
      amount: 0,
      IBAN: IBAN,
    });
    await newAccount.save();

    user.accounts.push(newAccount);
    await User.findByIdAndUpdate(
      user._id,
      { accounts: user.accounts },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
    return { status: true, message: user };
  } catch (err) {
    return { status: false, message: err };
  }
};

/*
Delete Account
params:  account's IBAN
return: Message
*/

exports.deleteAccount = async (account) => {
  try {
    const user = await getUserByAccount(account);
    let index = -1;
    user.accounts.forEach((acc, i) => {
      if (acc.IBAN === account) {
        index = i;
      }
    });
    if (index === -1) {
      return { status: true, message: "Not found" };
    } else {
      user.accounts.splice(index, 1);
      await User.findByIdAndUpdate(
        user._id,
        { accounts: user.accounts },
        {
          returnDocument: "after",
          runValidators: true,
        }
      );
      return { status: true, message: "Deleted" };
    }
  } catch (err) {
    return { status: false, message: err };
  }
};

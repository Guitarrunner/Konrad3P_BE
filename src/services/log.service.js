//--------------------------------- MODELS ----------------------------------//

const User = require("../models/user.model");

//--------------------------------- IMPORTS ----------------------------------//

const jwt = require("jsonwebtoken");
const newAccounts = require("../helpers/newAccounts");

//--------------------------------- FUNCTIONS ----------------------------------//

/*
Get All Users
params: none
return: List with all users
*/
exports.getAll = async () => {
  try {
    const users = await User.find();
    return { status: true, message: users };
  } catch (err) {
    return { status: false, message: err };
  }
};

/*
Get By Email
params: email, password
return: status, token if password is correct
*/

exports.getByEmail = async (email, password) => {
  let user;
  try {
    user = await User.findOne({ email: email });
    if (user.password === password) {
      let token = jwt.sign({ email: email }, "secretkey");
      return { status: true, message: token };
    } else {
      return { status: false, message: "Wrong password" };
    }
  } catch {
    return { status: false, message: "Not found" };
  }
};

/*
Post User
params: body
return: user
*/

exports.postUser = async (body) => {
  const accounts = await newAccounts(body.fullName);
  const user = new User({ ...body, accounts: accounts });
  try {
    await user.save();
    return { status: true, message: user };
  } catch (err) {
    return { status: false, message: err };
  }
};

//--------------------------------- MODELS ----------------------------------//

const User = require("../models/user.model");

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
Get By ID
params: id
return: status, user
*/

exports.getById = async (index) => {
    let user;
    try {
      user = await User.findById(index);
      if (user) {
        return { status: true, message: user };
      } else {
        return { status: false, message: "Not found" };
      }
    } catch (err) {
      return { status: false, message: "Not found" };
    }
  };
  
  /*
  Update by Id
  params: body, id
  return: status, user
  */
  
  exports.updateUser = async (body, index) => {
    try {
      const user = await User.findByIdAndUpdate(index, body, {
        returnDocument: "after",
        runValidators: true,
      });
      return { status: true, message: user };
    } catch (err) {
      return { status: false, message: err };
    }
  };
  
  /*
  Delete by Id
  params: id
  return: status, message if deleted
  */
  
  exports.deleteUser = async (index) => {
    try {
      const user = await User.findByIdAndDelete(index);
      return { status: true, message: "Deleted" };
    } catch {
      return { status: false, message: err };
    }
  };

  
  
  
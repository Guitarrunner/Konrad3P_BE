const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  holder: { type: String, required: true },
  type: { type: String, required: true, enum:{values:["US","CR"],message:"Only valid in CRC or US"} },
  amount: {type:Number, required:true},
  IBAN: {type:Number, required:true, unique:true}
  
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;

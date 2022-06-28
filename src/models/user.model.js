const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  idPhoto: { type: String, required: true },
  sourceIncome: {
    type: String,
    required: true,
    enum: {
      values: [
        "Employed/Salaried",
        "Bussiness Owner",
        "Self Employed",
        "Retired",
        "Investor",
        "Other",
      ],
      message: "{VALUE} is not supported",
    },
  },
  email: {
    type: String,
    required: true,
    unique:true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true
  },
  accounts:{
    type: Array,
  },
  log:{
    type:Array
  },
  services:{
    type:Array
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

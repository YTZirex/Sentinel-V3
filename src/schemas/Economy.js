const { model, Schema } = require("mongoose");

const Economy = new Schema(
  {
    user: String,
    names: String,
    dateOfBirth: String,
    gender: String,
    balance: Number,
    creditCardNumber: String,
    cvc: String,
    expirationDate: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Economy", Economy);

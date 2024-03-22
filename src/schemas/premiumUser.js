const { model, Schema } = require("mongoose");

const PremiumUser = new Schema(
  {
    code: String,
    length: String,
    redeemedBy: {
      id: String,
      username: String,
    },
    redeemedOn: Date,
    expiresAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = model("PremiumUser", PremiumUser);

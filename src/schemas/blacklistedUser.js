const { model, Schema } = require("mongoose");

const BlacklistedUser = new Schema(
  {
    id: String,
    blacklisted: Boolean,
    reason: String,
    moderator: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("BlacklistedUser", BlacklistedUser);

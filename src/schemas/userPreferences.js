const { model, Schema } = require("mongoose");

const UserPreferences = new Schema(
  {
    id: String,
    language: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("UserPreferences", UserPreferences);

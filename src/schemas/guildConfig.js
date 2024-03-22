const { model, Schema } = require("mongoose");

const GuildConfig = new Schema(
  {
    id: String,
    language: String,
    logs: {
      moderation: {
        enabled: Boolean,
        channelId: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("GuildConfig", GuildConfig);

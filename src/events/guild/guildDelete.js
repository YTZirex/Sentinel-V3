const { Events } = require("discord.js");
const GuildConfig = require("../../schemas/guildConfig");
module.exports = {
  name: Events.GuildDelete,
  once: false,
  async execute(guild) {
    try {
      await GuildConfig.findOneAndDelete({
        id: guild.id,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

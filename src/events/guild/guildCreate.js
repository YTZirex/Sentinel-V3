const { Events } = require("discord.js");
const GuildConfig = require("../../schemas/guildConfig");
module.exports = {
  name: Events.GuildCreate,
  once: false,
  async execute(guild) {
    let guildConfigData = await GuildConfig.findOne({
      id: guild.id,
    });

    if (!guildConfigData)
      await GuildConfig.create({
        id: guild.id,
        language: "en",
      });
  },
};

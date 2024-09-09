const { Events } = require("discord.js");
const GuildConfig = require("../../schemas/guildConfig");
const BlacklistedUser = require("../../schemas/blacklistedUser");

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

    const owner = await guild.fetchOwner();

    let blacklistedUser = await BlacklistedUser.findOne({
      id: owner.id,
    });

    if (blacklistedUser && blacklistedUser.blacklisted === true) {
      console.log(
        `L'owner de ${guild.name} (${guild.id}) est blacklist! Je suis partit comme mon daron !`
      );

      return guild.leave();
    }
  },
};

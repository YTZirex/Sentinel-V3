const { Events, Collection } = require("discord.js");
const mConfig = require("../../../data/messageConfig.json");
const UserPreferences = require("../../schemas/userPreferences");
module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    let userPreferenceData = await UserPreferences.findOne({
      id: interaction.user.id,
    });

    if (!userPreferenceData) {
      userPreferenceData = await UserPreferences.create({
        id: interaction.user.id,
        language: "en",
      });
    }

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      const { cooldowns } = interaction.client;

      if (!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, new Collection());
      }

      const now = Date.now();
      const timestamps = cooldowns.get(command.data.name);
      const defaultCooldownDuration = 3;
      const cooldownAmount =
        (command.cooldown ?? defaultCooldownDuration) * 1_000;

      if (timestamps.has(interaction.user.id)) {
        const expirationTime =
          timestamps.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
          const expiredTimestamp = Math.round(expirationTime / 1_000);
          return interaction.reply({
            content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
            ephemeral: true,
          });
        }
      }
      await command.execute(interaction);
      console.log(
        `${interaction.user.username} (${interaction.user.id}) - Executed /${interaction.commandName}`
      );
      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        return interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        return interaction.reply({
          content: mConfig.languages.french.embedErrorMessage,
          ephemeral: true,
        });
      }
    }
  },
};

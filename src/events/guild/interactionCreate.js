const { Events, Collection } = require("discord.js");
const mConfig = require("../../../data/messageConfig.json");
const UserPreferences = require("../../schemas/userPreferences");
const BlacklistedUser = require("../../schemas/blacklistedUser");
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

      let blacklistedUser = await BlacklistedUser.findOne({
        id: interaction.user.id,
      });

      if (!blacklistedUser)
        blacklistedUser = await BlacklistedUser.create({
          id: interaction.user.id,
          blacklisted: false,
          reason: "None",
          moderator: "None",
        });

      if (blacklistedUser && blacklistedUser.blacklisted === true) {
        return interaction.reply({
          embeds: [
            {
              color: 0xff6666,

              title:
                interaction.locale === "fr"
                  ? "Vous êtes actuellement blacklist de Sentinel. Pour contester votre sanction, veuillez rejoindre notre Support."
                  : "You are currently blacklisted from Sentinel. To appeal, please join our Support.",
              fields: [
                {
                  name: interaction.locale === "fr" ? "Raison" : "Reason",
                  value: `${blacklistedUser.reason}`,
                },
                {
                  name:
                    interaction.locale === "fr" ? "Modérateur" : "Moderator",
                  value: `${blacklistedUser.moderator}`,
                },
              ],
              thumbnail: {
                url: interaction.client.user.displayAvatarURL(),
              },
            },
          ],
          ephemeral: true,
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  style: 5,
                  url: "https://discord.gg/wuETgs5mSa",
                  label: "Support",
                  emoji: "💬",
                },
              ],
            },
          ],
        });
      }

      await command.execute(interaction);
      const channel = await interaction.client.channels.fetch(
        "1223740235070967878"
      );
      if (interaction.guild) {
        channel.send({
          embeds: [
            {
              color: 0x6666ff,
              author: {
<<<<<<< HEAD
                name: `${interaction.user.username} - ${interaction.user.id}`,
                icon_url: interaction.user.displayAvatarURL(),
              },
              thumbnail: { url: interaction.guild.iconURL() },
=======
                text: `${interaction.user.username} - ${interaction.user.id}`,
                icon_url: interaction.user.displayAvatarURL(),
              },
>>>>>>> 660856864274a2a864adee5c663179c5bd6a34f6
              description: `\`${interaction.commandName}\` in **${interaction.guild.name} - ${interaction.guild.id}**`,
            },
          ],
        });
      } else {
        channel.send({
          embeds: [
            {
              color: 0x6666ff,
              author: {
<<<<<<< HEAD
                name: `${interaction.user.username} - ${interaction.user.id}`,
                icon_url: interaction.user.displayAvatarURL(),
              },
              thumbnail: { url: interaction.user.displayAvatarURL() },
=======
                text: `${interaction.user.username} - ${interaction.user.id}`,
                icon_url: interaction.user.displayAvatarURL(),
              },
>>>>>>> 660856864274a2a864adee5c663179c5bd6a34f6
              description: `\`${interaction.commandName}\` in **DMs**.`,
            },
          ],
        });
      }
      console.log(
        `${interaction.user.username} (${interaction.user.id}) - Executed /${interaction.commandName}`
      );
      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        return interaction.followUp({
          content:
            interaction.locale === "fr"
              ? `Une erreur est survenue pendant l'exécution de la commande.`
              : "There was an error while executing this command.",
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

const { ApplicationCommandOptionType } = require("discord.js");
const GuildConfig = require("../../schemas/guildConfig");
const UserPreferences = require("../../schemas/userPreferences");
const PremiumUser = require("../../schemas/premiumUser");

module.exports = {
  premium: false,
  cooldown: 3,
  dev: false,
  data: {
    name: "userinfo",
    name_localizations: {
      fr: "info-utilisateur",
    },
    description: "Get the user's informations.",
    description_localizations: {
      fr: "Permet de récuperer des informations sur l'utilisateur",
    },
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
      {
        type: ApplicationCommandOptionType.User,
        name: "user",
        name_localizations: {
          fr: "utilisateur",
        },
        description: "Select the user.",
        description_localizations: {
          fr: "Sélectionnez l'utilisateur",
        },
      },
    ],
  },
  async execute(interaction) {
    let preferences;
    if (interaction.guild == null) {
      preferences = await UserPreferences.findOne({
        id: interaction.user.id,
      });
    } else {
      preferences = await GuildConfig.findOne({
        id: interaction.guild.id,
      });
    }
    let target = interaction.options.getUser("user") || interaction.user;

    await interaction.deferReply();
    let fetchedMember = await target.fetch();
    if (interaction.guild == null) {
      if (preferences && preferences.language) {
        return interaction.editReply({
          embeds: [
            {
              //@ts-ignore
              color: 0x6666ff,
              thumbnail: {
                url:
                  target.displayAvatarURL({ size: 64 }) ||
                  interaction.client.user.displayAvatarURL({ size: 64 }),
              },
              author: {
                name: `${
                  preferences.language === "fr"
                    ? `Profil de ${target.tag}`
                    : `${target.tag}'s profile`
                }`,
                icon_url:
                  fetchedMember.displayAvatarURL() ||
                  interaction.client.user.displayAvatarURL(),
              },
              description: `
          
                    __**${
                      preferences.language === "fr"
                        ? "Informations Utilisateur"
                        : "User Info"
                    }**__
                    > **ID:** ${target.id}
                    > **Bot:** ${target.bot ? "✅" : "❌"}
                    > ${
                      preferences.language === "fr"
                        ? "**Compte crée:**"
                        : "**Account Created:**"
                    } <t:${(target.createdTimestamp / 1000).toFixed(0)}:D>
                    > **Sentinel Premium**: ${
                      (await IsPremium(target.id)) === true ? "✅" : "❌"
                    }`,
            },
          ],
        });
      } else {
        // DONT CHANGE DONT CHANGE DONT CHANGE
        return interaction.editReply({
          embeds: [
            {
              //@ts-ignore
              color: 0x6666ff,
              thumbnail: {
                url:
                  target.displayAvatarURL({ size: 64 }) ||
                  interaction.client.user.displayAvatarURL({ size: 64 }),
              },
              author: {
                name: `${target.tag}'s profile`,
                icon_url:
                  fetchedMember.displayAvatarURL() ||
                  interaction.client.user.displayAvatarURL(),
              },
              description: `
          
                    __**User Info**__
                    > **ID:** ${target.id}
                    > **Bot:** ${target.bot ? "✅" : "❌"}
                    > **Account Created:** <t:${(
                      target.createdTimestamp / 1000
                    ).toFixed(0)}:D>
                    > **Sentinel Premium**: ${
                      (await IsPremium(target.id)) === true ? "✅" : "❌"
                    }`,
            },
          ],
        });
      }
    } else {
      // DONT CHANGE DONT CHANGE
      if (preferences && preferences.language) {
        return interaction.editReply({
          embeds: [
            {
              //@ts-ignore
              color: 0x6666ff,
              thumbnail: {
                url:
                  target.displayAvatarURL({ size: 64 }) ||
                  interaction.client.user.displayAvatarURL({ size: 64 }),
              },
              author: {
                name: `${
                  preferences.language === "fr"
                    ? `Profil de ${target.tag}`
                    : `${target.tag}'s profile`
                }`,
                icon_url:
                  fetchedMember.displayAvatarURL() ||
                  interaction.client.user.displayAvatarURL(),
              },
              description: `
          
                    __**${
                      preferences.language === "fr"
                        ? "Informations Utilisateur"
                        : "User Info"
                    }**__
                    > **ID:** ${target.id}
                    > **Bot:** ${target.bot ? "✅" : "❌"}
                    > ${
                      preferences.language === "fr"
                        ? "**Compte crée:**"
                        : "**Account Created:**"
                    } <t:${(target.createdTimestamp / 1000).toFixed(0)}:D>
                    > **Sentinel Premium**: ${
                      (await IsPremium(target.id)) === true ? "✅" : "❌"
                    }
          
                    __**${
                      preferences.language === "fr"
                        ? "Informations Membre"
                        : "Member Infos"
                    }**__
                    > ${
                      preferences.language === "fr"
                        ? "**Surnom:**"
                        : "**Nickname:**"
                    } ${fetchedMember.nickname || target.username}
                    > **Roles [${fetchedMember.roles.cache.size - 1}]:** ${
                fetchedMember.roles.cache
                  .map((r) => r)
                  .join(", ")
                  .replace("@everyone", "") ||
                (preferences.language === "fr" ? "Aucun" : "None")
              }
                    > ${
                      preferences.language === "fr"
                        ? "**Permission Administrateur:**"
                        : "**Administrator Permission:**"
                    } ${
                fetchedMember.permissions.has(
                  PermissionsBitField.Flags.Administrator
                )
                  ? "✅"
                  : "❌"
              }
                    > **${
                      preferences.language === "fr" ? "Rejoint:" : "Joined:"
                    }** <t:${(fetchedMember.joinedTimestamp / 1000).toFixed(
                0
              )}:D>
                    > ${
                      preferences.language === "fr"
                        ? "**Position:**"
                        : `**Join Position:**`
                    } ${GetJoinPosition(interaction, fetchedMember) + 1} / ${
                interaction.guild.memberCount
              }
                    `,
            },
          ],
        });
      } else {
        // DONT CHANGE DONT CHANGE DONT CHANGE
        return interaction.editReply({
          embeds: [
            {
              //@ts-ignore
              color: 0x6666ff,
              thumbnail: {
                url:
                  target.displayAvatarURL({ size: 64 }) ||
                  interaction.client.user.displayAvatarURL({ size: 64 }),
              },
              author: {
                name: `${target.tag}'s profile`,
                icon_url:
                  fetchedMember.displayAvatarURL() ||
                  interaction.client.user.displayAvatarURL(),
              },
              description: `
          
                    __**User Info**__
                    > **ID:** ${target.id}
                    > **Bot:** ${target.bot ? "✅" : "❌"}
                    > **Account Created:** <t:${(
                      target.createdTimestamp / 1000
                    ).toFixed(0)}:D>
                    > **Sentinel Premium**: ${
                      (await IsPremium(target.id)) === true ? "✅" : "❌"
                    }
          
                    __**Member Info**__
                    > **Nickname:** ${fetchedMember.nickname || target.username}
                    > **Roles [${fetchedMember.roles.cache.size - 1}]**: ${
                fetchedMember.roles.cache
                  .map((r) => r)
                  .join(", ")
                  .replace("@everyone", "") || "None"
              }
                    > **Administrator Permission:** ${
                      fetchedMember.permissions.has(
                        PermissionsBitField.Flags.Administrator
                      )
                        ? "✅"
                        : "❌"
                    }
                    > **Joined:** <t:${(
                      fetchedMember.joinedTimestamp / 1000
                    ).toFixed(0)}:D>
                    > **Join Position:** ${
                      GetJoinPosition(interaction, fetchedMember) + 1
                    } / ${interaction.guild.memberCount}
                    `,
            },
          ],
        });
      }
    }

    async function IsPremium(userId) {
      let code = await PremiumUser.findOne({ "redeemedBy.id": userId });
      if (code) {
        return true;
      } else {
        return false;
      }
    }

    async function GetJoinPosition(interaction, target) {
      let pos = null;
      const joinPosition = interaction.guild.members.cache.sort(
        (a, b) => a.joinedTimestamp - b.joinedTimestamp
      );
      Array.from(joinPosition).find((member, index) => {
        if (member[0] == target.user.id) {
          pos = index;
        }
      });
      return pos;
    }
  },
};

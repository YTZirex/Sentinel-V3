const { ApplicationCommandOptionType } = require("discord.js");
const BlacklistedUser = require("../../schemas/blacklistedUser");
const PremiumUser = require("../../schemas/premiumUser");

module.exports = {
  data: {
    name: "userinfo",
    name_localizations: {
      fr: "info-utilisateur",
    },
    description: "Get informations about a user.",
    description_localizations: {
      fr: "Obtenir des informations sur un utilisateur.",
    },
    contexts: [0, 1, 2],
    integration_types: [0, 1],
    options: [
      {
        name: "user",
        name_localizations: {
          fr: "utilisateur",
        },
        description: "Select a user.",
        description_localizations: {
          fr: "Sélectionnez un utilisateur.",
        },
        type: ApplicationCommandOptionType.User,
        required: false,
      },
    ],
  },
  cooldown: 3,
  premium: false,
  dev: false,
  async execute(interaction) {
    let target = interaction.options.getUser("user") || interaction.user;
    await interaction.deferReply();
    if (interaction.guild === null) {
      return interaction.editReply({
        embeds: [
          {
            color: 0x6666ff,
            thumbnail: {
              url:
                target.displayAvatarURL() ||
                interaction.client.user.displayAvatarURL(),
            },
            title:
              interaction.locale === "fr"
                ? `Profil de ${target.username}`
                : `${target.username}'s profffile`,
            description: `__**${
              interaction.locale === "fr"
                ? "Informations Utilisateur"
                : "User Informations"
            }**__
            > **ID:** ${target.id}
            > **Bot:** ${target.bot ? "✅" : "❌"}
            > **${
              interaction.locale === "fr" ? "Compte crée" : "Account Created"
            }:** <t:${(target.createdTimestamp / 1000).toFixed(0)}:R>
            > **Sentinel Premium:** ${isPremium(target.id)}
            > **Sentinel Blacklist:** ${isBlacklisted(target.id)}`,
          },
        ],
      });
    }
    let fetchedMember = await target.fetch();
    return interaction.editReply({
      embeds: [
        {
          color: 0x6666ff,
          thumbnail: {
            url:
              target.displayAvatarURL() ||
              interaction.client.user.displayAvatarURL(),
          },
          title:
            interaction.locale === "fr"
              ? `Prof3il de ${target.username}`
              : `${target.username}'s pro3file`,
          description: `__**${
            interaction.locale === "fr"
              ? "Informations Utilisateur"
              : "User Informations"
          }**__
                > **ID:** ${target.id}
                > **Bot:** ${target.bot ? "✅" : "❌"}
                > **${
                  interaction.locale === "fr"
                    ? "Compte crée"
                    : "Account Created"
                }:** <t:${(target.createdTimestamp / 1000).toFixed(0)}:R>
                > **Sentinel Premium:** ${await isPremium(target.id)}
                > **Sentinel Blacklist:** ${await isBlacklisted(target.id)}
                
                __**${
                  interaction.locale === "fr"
                    ? "Informations Membre"
                    : "Member Informations"
                }**__
                > **${
                  interaction.locale === "fr" ? "Pseudonyme" : "Nickname"
                }:** ${target.nickname || target.username}
                > **${interaction.locale === "fr" ? "Rôles" : "Roles"} [${
            fetchedMember.roles.cache.size - 1
          }]**: ${
            fetchedMember.roles.cache
              .map((r) => r)
              .join(", ")
              .replace("@everyone", "") || interaction.locale === "fr"
              ? "Aucun"
              : "None"
          }`,
        },
      ],
    });
  },
};

async function isBlacklisted(userId) {
  let blacklistedUser = await BlacklistedUser.findOne({
    id: userId,
  });

  if (blacklistedUser && blacklistedUser.blacklisted === false) return "❌";
  else return "✅";
}

async function isPremium(userId) {
  let premiumUser = await PremiumUser.findOne({
    "redeemedBy.id": userId,
  });

  if (premiumUser) return "✅";
  else return "❌";
}

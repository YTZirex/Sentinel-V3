const {
  ApplicationCommandOptionType,
  PermissionsBitField,
} = require("discord.js");
const BlacklistedUser = require("../../schemas/blacklistedUser");
const PremiumUser = require("../../schemas/premiumUser");
const CommandCounter = require("../../schemas/commandCounter");
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
    let commandCounter = await CommandCounter.findOne({
      global: 1,
    });
    commandCounter.userInfo.used += 1;
    await commandCounter.save();
    await interaction.deferReply();
    if (interaction.guild) {
      let fetchedMember = interaction.guild.members.cache.get(target.id);
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
                : `${target.username}'s profile`,
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
            > **Sentinel Premium:** ${await isPremium(target.id)}
            > **Sentinel Blacklist:** ${await isBlacklisted(target.id)}
            
            __**${
              interaction.locale === "fr"
                ? "Informations Membre"
                : "Member Informations"
            }**__`,
          },
        ],
      });
    } else {
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
                : `${target.username}'s profile`,
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
            > **Sentinel Premium:** ${await isPremium(target.id)}
            > **Sentinel Blacklist:** ${await isBlacklisted(target.id)}`,
          },
        ],
      });
    }
  },
};

async function isBlacklisted(userId) {
  let blacklistedUser = await BlacklistedUser.findOne({
    id: userId,
  });

  if (blacklistedUser && blacklistedUser.blacklisted === true) return "✅";
  else return "❌";
}

async function isPremium(userId) {
  let premiumUser = await PremiumUser.findOne({
    "redeemedBy.id": userId,
  });

  if (premiumUser) return "✅";
  else return "❌";
}

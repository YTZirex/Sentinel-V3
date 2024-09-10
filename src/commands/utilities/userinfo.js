<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 988b432d60e594fd86fd3f6ae9ef337abe822970
const {
  ApplicationCommandOptionType,
  PermissionsBitField,
} = require("discord.js");
<<<<<<< HEAD
=======
=======
const { ApplicationCommandOptionType } = require("discord.js");
>>>>>>> 660856864274a2a864adee5c663179c5bd6a34f6
>>>>>>> 988b432d60e594fd86fd3f6ae9ef337abe822970
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

>>>>>>> 660856864274a2a864adee5c663179c5bd6a34f6
>>>>>>> 988b432d60e594fd86fd3f6ae9ef337abe822970
    commandCounter.userInfo.used += 1;
    await commandCounter.save();
    await interaction.deferReply();
    if (interaction.guild) {
<<<<<<< HEAD
      let fetchedMember = interaction.guild.members.cache.get(target.id);
=======
<<<<<<< HEAD
      let fetchedMember = interaction.guild.members.cache.get(target.id);
=======
      let fetchedMember = await target.fetch();
>>>>>>> 660856864274a2a864adee5c663179c5bd6a34f6
>>>>>>> 988b432d60e594fd86fd3f6ae9ef337abe822970
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
<<<<<<< HEAD
                ? `Profil de ${target.username}`
                : `${target.username}'s profile`,
=======
<<<<<<< HEAD
                ? `Profil de ${target.username}`
                : `${target.username}'s profile`,
=======
                ? `Prof3il de ${target.username}`
                : `${target.username}'s pro3file`,
>>>>>>> 660856864274a2a864adee5c663179c5bd6a34f6
>>>>>>> 988b432d60e594fd86fd3f6ae9ef337abe822970
            description: `__**${
              interaction.locale === "fr"
                ? "Informations Utilisateur"
                : "User Informations"
            }**__
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 988b432d60e594fd86fd3f6ae9ef337abe822970
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
<<<<<<< HEAD
=======
=======
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
>>>>>>> 660856864274a2a864adee5c663179c5bd6a34f6
>>>>>>> 988b432d60e594fd86fd3f6ae9ef337abe822970
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
<<<<<<< HEAD
                : `${target.username}'s profile`,
=======
<<<<<<< HEAD
                : `${target.username}'s profile`,
=======
                : `${target.username}'s profffile`,
>>>>>>> 660856864274a2a864adee5c663179c5bd6a34f6
>>>>>>> 988b432d60e594fd86fd3f6ae9ef337abe822970
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
<<<<<<< HEAD
            > **Sentinel Premium:** ${await isPremium(target.id)}
            > **Sentinel Blacklist:** ${await isBlacklisted(target.id)}`,
=======
<<<<<<< HEAD
            > **Sentinel Premium:** ${await isPremium(target.id)}
            > **Sentinel Blacklist:** ${await isBlacklisted(target.id)}`,
=======
            > **Sentinel Premium:** ${isPremium(target.id)}
            > **Sentinel Blacklist:** ${isBlacklisted(target.id)}`,
>>>>>>> 660856864274a2a864adee5c663179c5bd6a34f6
>>>>>>> 988b432d60e594fd86fd3f6ae9ef337abe822970
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

<<<<<<< HEAD
  if (blacklistedUser && blacklistedUser.blacklisted === true) return "✅";
  else return "❌";
=======
<<<<<<< HEAD
  if (blacklistedUser && blacklistedUser.blacklisted === true) return "✅";
  else return "❌";
=======
  if (blacklistedUser && blacklistedUser.blacklisted === false) return "❌";
  else return "✅";
>>>>>>> 660856864274a2a864adee5c663179c5bd6a34f6
>>>>>>> 988b432d60e594fd86fd3f6ae9ef337abe822970
}

async function isPremium(userId) {
  let premiumUser = await PremiumUser.findOne({
    "redeemedBy.id": userId,
  });

  if (premiumUser) return "✅";
  else return "❌";
}

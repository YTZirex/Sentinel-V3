const {
  ApplicationCommandOptionType,
  PermissionsBitField,
  PermissionFlagsBits,
} = require("discord.js");
const CommandCounter = require("../../schemas/commandCounter");

module.exports = {
  premium: false,
  cooldown: 3,
  dev: false,
  data: {
    name: "ban",
    description: "Ban a user from the server.",
    description_localizations: {
      fr: "Bannie un utilisateur du serveur.",
    },
    options: [
      {
        name: "target",
        name_localizations: {
          fr: "utilisateur",
        },
        description: `Select a user.`,
        description_localizations: {
          fr: `Sélectionnez un utilisateur.`,
        },
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: "reason",
        name_localizations: {
          fr: "raison",
        },
        description: `Input a reason.`,
        description_localizations: {
          fr: "Entrez une raison.",
        },
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: "silent",
        name_localizations: {
          fr: "silencieux",
        },
        description: "Silent mode",
        description_localizations: {
          fr: "Mode silencieux",
        },
        required: false,
        type: ApplicationCommandOptionType.Boolean,
      },
    ],
  },
  async execute(interaction) {
    let target = interaction.options.getUser("target");
    let reason =
      interaction.options.getString("reason") || interaction.locale === "fr"
        ? "Aucune raison fournie."
        : "No reason was provided.";

    let silent = interaction.options.getBoolean("silent") || false;

    let commandCounter = await CommandCounter.findOne({
      global: 1,
    });

    commandCounter.ban.used += 1;
    await commandCounter.save();

    await interaction.deferReply();

    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.BanMembers
      )
    ) {
      return interaction.editReply({
        embeds: [
          {
            color: 0xff6666,
            thumbnail: {
              url: interaction.client.user.displayAvatarURL(),
            },
            title:
              interaction.locale === "fr"
                ? `Je n'ai pas la permission \`Ban Members\`.`
                : `I don't have the \`Ban Members\` permission.`,
          },
        ],
        ephemeral: true,
      });
    }

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    ) {
      return interaction.editReply({
        embeds: [
          {
            color: 0xff6666,
            thumbnail: {
              url: interaction.client.user.displayAvatarURL(),
            },
            title:
              interaction.locale === "fr"
                ? `Vous n'avez pas la permission \`Ban Members\`.`
                : `You do not have the \`Ban Members\` permission.`,
          },
        ],
        ephemeral: true,
      });
    }

    if (interaction.user.id === target.id) {
      return interaction.editReply({
        embeds: [
          {
            color: 0xff6666,
            thumbnail: {
              url: interaction.client.user.displayAvatarURL(),
            },
            title:
              interaction.locale === "fr"
                ? `Vous ne pouvez pas vous bannir vous-même.`
                : `You can not ban yourself.`,
          },
        ],
        ephemeral: true,
      });
    }
    let targetMember = await interaction.guild.members.cache.get(target.id);
    if (
      targetMember.roles.highest.position >=
      interaction.member.roles.highest.position
    ) {
      return interaction.editReply({
        embeds: [
          {
            color: 0xff6666,
            thumbnail: {
              url: interaction.client.user.displayAvatarURL(),
            },
            title:
              interaction.locale === "fr"
                ? `Vous ne pouvez pas vous bannir un utilisateur avec un rôle supérieur ou égal à votre rôle.`
                : `You can not ban a user with a role higher or equal to your role.`,
          },
        ],
        ephemeral: true,
      });
    }

    if (!targetMember.banable) {
      return interaction.editReply({
        embeds: [
          {
            color: 0xff6666,
            thumbnail: {
              url: interaction.client.user.displayAvatarURL(),
            },
            title:
              interaction.locale === "fr"
                ? `Cet utilisateur ne peut pas être banni(e).`
                : `This user can not be banned.`,
          },
        ],
        ephemeral: true,
      });
    }

    if (reason.length > 512) {
      return interaction.editReply({
        embeds: [
          {
            color: 0xff6666,
            thumbnail: {
              url: interaction.client.user.displayAvatarURL(),
            },
            title:
              interaction.locale === "fr"
                ? `La raison ne peut être plus long que 512 caractères.`
                : `The reason can not be longer than 512 characters.`,
          },
        ],
        ephemeral: true,
      });
    }

    try {
      await target.send({
        embeds: [
          {
            color: 0xff6633,
            title:
              interaction.locale === "fr"
                ? `🔨 Vous avez été banni(e)(e) de **${interaction.guild.name}** !`
                : `🔨 You have been banned from **${interaction.guild.name}** !`,
            fields: [
              {
                name: interaction.locale === "fr" ? `Modérateur` : "Moderator",
                value: interaction.user.username,
              },
              {
                name: interaction.locale === "fr" ? `Raison` : "Reason",
                value: reason,
              },
            ],
            thumbnail: {
              url: interaction.guild.iconURL(),
            },
          },
        ],
      });
    } catch (err) {}

    try {
      let username = targetMember.user.username;
      await targetMember.ban(reason);

      return interaction.editReply({
        embeds: [
          {
            color: 0xff6633,
            thumbnail: {
              url: targetMember.user.displayAvatarURL(),
            },
            title: `${
              interaction.locale === "fr"
                ? `🔨 **${targetMember.user.username}** a été banni(e) !`
                : `🔨 Successfully banned **${targetMember.user.username}** !`
            }`,
          },
        ],
        ephemeral: silent,
      });
    } catch (err) {
      console.log(err);
      return interaction.editReply({
        embeds: [
          {
            color: 0xff6666,
            thumbnail: {
              url: interaction.client.user.displayAvatarURL(),
            },
            title:
              interaction.locale === "fr"
                ? "Une erreur est survenue en essayant de bannir l'utilisateur."
                : "An error occured while trying to ban the user.",
          },
        ],
      });
    }
  },
};

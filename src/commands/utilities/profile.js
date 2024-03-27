const { profileImage } = require("discord-arts");
const {
  AttachmentBuilder,
  ApplicationCommandOptionType,
  GuildMember,
  Guild,
} = require("discord.js");

module.exports = {
  cooldown: 3,
  premium: false,
  dev: false,
  data: {
    contexts: [0, 1, 2],
    integration_types: [0, 1],
    name: "profile",
    description: `Get the user's profile`,
    description_localizations: {
      fr: `Récupérer le profile de l'utilisateur.`,
    },
    options: [
      {
        name: "user",
        name_localizations: {
          fr: "utilisateur",
        },
        description: `Select a user.`,
        description_localizations: {
          fr: `Sélectionnez un utilisateur.`,
        },
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
  async execute(interaction) {
    const target = interaction.options.getUser("user") || interaction.user;

    await interaction.deferReply();

    const buffer = await profileImage(target.id, {
      badgesFrame: true,
      backgroundBrightness: 100,
      removeAvatarFrame: false,
      moreBackgroundBlur: true,
    });

    let attachment = new AttachmentBuilder(buffer).setName(`profile.png`);
    return interaction.editReply({
      files: [attachment],
    });
  },
};

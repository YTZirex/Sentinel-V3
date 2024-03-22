const { ApplicationCommandOptionType } = require("discord.js");
const GuildConfig = require("../../schemas/guildConfig");
const UserPreferences = require("../../schemas/userPreferences");
const axios = require("axios");

module.exports = {
  cooldown: 5,
  premium: false,
  dev: false,
  data: {
    name: "kiss",
    name_localizations: {
      fr: "bisous",
    },
    description: "Kiss someone",
    description_localizations: {
      fr: "Embrasser quelqu'un",
    },
    contexts: [0, 1, 2],
    integration_types: [0, 1],
    options: [
      {
        name: "user",
        name_localizations: {
          fr: "utilisateur",
        },
        description: "The user to kiss",
        description_localizations: {
          fr: "L'utilisateur à embrasser.",
        },
        type: ApplicationCommandOptionType.User,
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
    let apiUrl = `https://nekos.life/api/v2/img/kiss`;
    let user = interaction.options.getUser("user");
    await interaction.deferReply();

    try {
      const response = await axios.get(apiUrl);
      const gifUrl = response.data.url;

      if (!user || interaction.user.id === user.id)
        return interaction.editReply({
          content:
            preferences && preferences.language === "fr"
              ? `${interaction.user} s'est embrassé lui même :pensive:`
              : `${interaction.user} kissed himself :pensive:`,
          embeds: [
            {
              image: {
                url: gifUrl,
              },
            },
          ],
        });

      return interaction.editReply({
        content:
          preferences && preferences.language === "fr"
            ? `${interaction.user} a embrassé ${user}`
            : `${interaction.user} kissed ${user}`,
        embeds: [
          {
            image: {
              url: gifUrl,
            },
          },
        ],
      });
    } catch (err) {
      console.log(err);
      return interaction.editReply(
        preferences && preferences.language === "fr"
          ? "Une erreur est survenue en essayant d'embrasser."
          : `An error occured while trying to kiss.`
      );
    }
  },
};

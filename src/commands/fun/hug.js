const { ApplicationCommandOptionType } = require("discord.js");
const GuildConfig = require("../../schemas/guildConfig");
const UserPreferences = require("../../schemas/userPreferences");
const axios = require("axios");

module.exports = {
  cooldown: 5,
  premium: false,
  dev: false,
  data: {
    name: "hug",
    name_localizations: {
      fr: "calin",
    },
    description: "Hug someone",
    description_localizations: {
      fr: "Faites un calin à quelqu'un",
    },
    contexts: [0, 1, 2],
    integration_types: [0, 1],
    options: [
      {
        name: "user",
        name_localizations: {
          fr: "utilisateur",
        },
        description: "The user to hug",
        description_localizations: {
          fr: "L'utilisateur à caliner.",
        },
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
  async execute(interaction) {
    let apiUrl = `https://nekos.life/api/v2/img/hug`;
    let user = interaction.options.getUser("user");
    await interaction.deferReply();

    try {
      const response = await axios.get(apiUrl);
      const gifUrl = response.data.url;

      if (!user || interaction.user.id === user.id)
        return interaction.editReply({
          content:
            interaction.locale === "fr"
              ? `${interaction.user} s'est fait un calin à lui même :pensive:`
              : `${interaction.user} hugged himself :pensive:`,
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
          interaction.locale === "fr"
            ? `${interaction.user} a fait un calin à ${user}`
            : `${interaction.user} hugged ${user}`,
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
        interaction.locale === "fr"
          ? "Une erreur est survenue pendant le calin."
          : `An error occured while trying to hug.`
      );
    }
  },
};

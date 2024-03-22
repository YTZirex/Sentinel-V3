const GuildConfig = require("../../schemas/guildConfig");
const UserPreferences = require("../../schemas/userPreferences");
const axios = require('axios');

module.exports = {
  data: {
    name: "joke",
    name_localizations: {
      fr: "blague",
    },
    description: "Get a random joke.",
    description_localizations: {
      fr: "Obtenir une blague aléatoire.",
    },
    integration_types: [0, 1],
    contexts: [0, 1, 2],
  },
  premium: false,
  dev: false,
  cooldown: 10,
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
    await interaction.deferReply();
    try {
      let response = await axios.get(
        preferences && preferences.language === "fr"
          ? "https://v2.jokeapi.dev/joke/Any?lang=fr"
          : "https://v2.jokeapi.dev/joke/Any"
      );

      if (response.status === 200) {
        let jokeData = response.data;
        if (jokeData.type === "single") {
          return interaction.editReply({
            embeds: [
              {
                color: 0x6666ff,
                title: `${jokeData.joke}`,
                thumbnail: {
                  url: interaction.client.user.displayAvatarURL(),
                },
                footer: {
                  text:
                    preferences && preferences.language === "fr"
                      ? `Blague #${jokeData.id} - ${jokeData.category}`
                      : `Joke ${jokeData.id} - ${jokeData.category}`,
                },
              },
            ],
          });
        } else if (jokeData.type === "twopart") {
          return interaction.editReply({
            embeds: [
              {
                color: 0x6666ff,
                title: `${jokeData.setup}`,
                description: `||${jokeData.delivery}||`,
                thumbnail: {
                  url: interaction.client.user.displayAvatarURL(),
                },
                footer: {
                  text:
                    preferences && preferences.language === "fr"
                      ? `Blague #${jokeData.id} - ${jokeData.category}`
                      : `Joke ${jokeData.id} - ${jokeData.category}`,
                },
              },
            ],
          });
        } else {
          return interaction.editReply({
            embeds: [
              {
                color: 0xff6666,
                title:
                  preferences && preferences.language === "fr"
                    ? "Oups"
                    : "Oops",
                description:
                  preferences && preferences.language === "fr"
                    ? "Une erreur est survenue lors de la récupération de la blague. Veuillez réessayer plus tard."
                    : "An error occurred while retrieving the joke. Please try again later.",
              },
            ],
          });
        }
      } else {
        return interaction.editReply({
          embeds: [
            {
              color: 0xff6666,
              title:
                preferences && preferences.language === "fr" ? "Oups" : "Oops",
              description:
                preferences && preferences.language === "fr"
                  ? "Une erreur est survenue lors de la récupération de la blague. Veuillez réessayer plus tard."
                  : "An error occurred while retrieving the joke. Please try again later.",
            },
          ],
        });
      }
    } catch (err) {
      return interaction.editReply({
        embeds: [
          {
            color: 0xff6666,
            title:
              preferences && preferences.language === "fr" ? "Oups" : "Oops",
            description:
              preferences && preferences.language === "fr"
                ? "Une erreur est survenue lors de la récupération de la blague. Veuillez réessayer plus tard."
                : "An error occurred while retrieving the joke. Please try again later.",
          },
        ],
      });
    }
  },
};

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
    await interaction.deferReply();
    try {
      let response = await axios.get(
        interaction.locale === "fr"
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
                    interaction.locale === "fr"
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
                    interaction.locale === "fr"
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
                  interaction.locale === "fr"
                    ? "Oups"
                    : "Oops",
                description:
                  interaction.locale === "fr"
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
                interaction.locale === "fr" ? "Oups" : "Oops",
              description:
                interaction.locale === "fr"
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
              interaction.locale === "fr" ? "Oups" : "Oops",
            description:
              interaction.locale === "fr"
                ? "Une erreur est survenue lors de la récupération de la blague. Veuillez réessayer plus tard."
                : "An error occurred while retrieving the joke. Please try again later.",
          },
        ],
      });
    }
  },
};

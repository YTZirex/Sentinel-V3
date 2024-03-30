const weather = require("weather-js");
const { Language, TranslationParameters, translate } = require("deepl-client");
const GuildConfig = require("../../schemas/guildConfig");
const UserPreferences = require("../../schemas/userPreferences");
const { ApplicationCommandOptionType } = require("discord.js");
const CommandCounter = require("../../schemas/commandCounter");

module.exports = {
  cooldown: 5,
  dev: false,
  premium: false,
  data: {
    contexts: [0, 1, 2],
    integration_types: [0, 1],
    name: "weather",
    name_localizations: {
      fr: "météo",
    },
    description: "Get the weather of a city.",
    description_localizations: {
      fr: "Récupérer la météo d'une ville.",
    },
    options: [
      {
        name: "location",
        name_localizations: {
          fr: "emplacement",
        },
        description: "The location to get the weather of.",
        description_localizations: {
          fr: "L'emplacement à obtenir la météo.",
        },
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "units",
        name_localizations: {
          fr: "unités",
        },
        description: "The units to use.",
        description_localizations: {
          fr: "Les unités à utiliser.",
        },
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: "Fahrenheit",
            value: "F",
          },
          {
            name: "Celcius",
            value: "C",
          },
        ],
      },
    ],
  },
  async execute(interaction) {
    let loc = interaction.options.getString("location");
    let units = interaction.options.getString("units");

    let commandCounter = await CommandCounter.findOne({
      global: 1,
    });

    commandCounter.weather.used += 1;
    await commandCounter.save();

    await interaction.deferReply();

    await weather.find(
      { search: `${loc}`, degreeType: `${units}` },
      async function (err, result) {
        setTimeout(async () => {
          if (err) {
            return interaction.editReply({
              embeds: [
                {
                  color: 0xff6666,
                  title: interaction.locale === "fr" ? "Oups!" : "Oops!",
                  description:
                    interaction.locale === "fr"
                      ? "Une erreur est survenue. Veuillez réessayer plus tard."
                      : "An error occured. Please try again later.",
                },
              ],
            });
          } else {
            if (result.length == 0) {
              return interaction.editReply({
                embeds: [
                  {
                    color: 0xff6666,
                    title: interaction.locale === "fr" ? "Oups!" : "Oops!",
                    description:
                      interaction.locale === "fr"
                        ? `Je n'ai pas pu trouver la météo de **${loc}**.`
                        : `I couldn't find the weather of **${loc}**.`,
                  },
                ],
              });
            } else {
              const temp = result[0].current.temperature;
              const type = result[0].current.skytext;
              const name = result[0].current.name;
              const feelsLike = result[0].current.feelslike;
              const icon = result[0].current.imageUrl;
              const wind = result[0].current.winddisplay;
              const day = result[0].current.day;
              const alert =
                result[0].current.alert || interaction.locale === "fr"
                  ? "Aucune"
                  : "None";

              return interaction.editReply({
                embeds: [
                  {
                    color: 0x6666ff,
                    title:
                      interaction.locale === "fr"
                        ? `Météo de **${loc}**`
                        : `Weather of **${loc}**`,
                    thumbnail: {
                      url: icon,
                    },
                    fields: [
                      {
                        name:
                          interaction.locale === "fr"
                            ? "Température"
                            : "Temperature",
                        value: units === "C" ? `${temp}°C` : `${temp}°F`,
                      },
                      {
                        name:
                          interaction.locale === "fr"
                            ? "Ressenti"
                            : "Feels Like",
                        value:
                          units === "C" ? `${feelsLike}°C` : `${feelsLike}°F`,
                      },
                      {
                        name: interaction.locale === "fr" ? "Météo" : "Weather",
                        value:
                          interaction.locale === "fr"
                            ? `${
                                (
                                  await translate({
                                    auth_key:
                                      "01be6c49-b75d-4c6f-b0e7-1cb6c8ddc8bd:fx",
                                    target_lang: Language.French,
                                    text: type,
                                  })
                                ).translations[0].text
                              }`
                            : `${type}`,
                      },
                      {
                        name:
                          interaction.locale === "fr"
                            ? "Alertes Actuelles"
                            : "Current Alerts",
                        value:
                          interaction.locale === "fr"
                            ? `${
                                alert === "Aucune"
                                  ? "Aucune"
                                  : await (
                                      await translate({
                                        auth_key:
                                          "01be6c49-b75d-4c6f-b0e7-1cb6c8ddc8bd:fx",
                                        target_lang: Language.French,
                                        text: alert,
                                      })
                                    ).translations[0].text
                              }`
                            : `${alert}`,
                      },
                      {
                        name:
                          interaction.locale === "fr"
                            ? "Jour De La Semaine"
                            : "Week Day",
                        value:
                          interaction.locale === "fr"
                            ? `${await (
                                await translate({
                                  auth_key:
                                    "01be6c49-b75d-4c6f-b0e7-1cb6c8ddc8bd:fx",
                                  target_lang: Language.French,
                                  text: day,
                                })
                              ).translations[0].text}`
                            : `${day}`,
                      },
                      {
                        name:
                          interaction.locale === "fr"
                            ? "Vitesse & Direction Du Vent"
                            : "Wind Speed & Direction",
                        value:
                          interaction.locale === "fr"
                            ? `${
                                (
                                  await translate({
                                    auth_key:
                                      "01be6c49-b75d-4c6f-b0e7-1cb6c8ddc8bd:fx",
                                    target_lang: Language.French,
                                    text: wind,
                                  })
                                ).translations[0].text
                              }`
                            : `${wind}`,
                      },
                    ],
                  },
                ],
              });
            }
          }
        });
      }
    );
  },
};

const axios = require("axios");
const { Language, TranslationParameters, translate } = require("deepl-client");
const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
  premium: false,
  dev: false,
  cooldown: 5,
  data: {
    name: "quote",
    name_localizations: {
      fr: "citation",
    },
    description: "Get a random quote.",
    description_localizations: {
      fr: "Obtenir une citation aléatoire.",
    },
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
      {
        name: "category",
        name_localizations: {
          fr: "catégorie",
        },
        description: `Select the category of the quote.`,
        description_localizations: {
          fr: "Choisissez la catégorie de la citation.",
        },
        required: true,
        type: ApplicationCommandOptionType.String,
        choices: [
          { name: "Age", value: "age" },
          { name: "Art", value: "art" },
          { name: "Business", value: "business" },
          {
            name: "Change",
            name_localizations: { fr: "Changement" },
            value: "change",
          },
          { name: "Communication", value: "communication" },
          { name: "Design", value: "design" },
          {
            name: "Dreams",
            name_localizations: { fr: "Rêves" },
            value: "dreams",
          },
          { name: "Education", value: "education" },
          {
            name: "Environmental",
            name_localizations: { fr: "Environnement" },
            value: "environmental",
          },
          {
            name: "Family",
            name_localizations: { fr: "Famille" },
            value: "family",
          },
          { name: "Fitness", value: "fitness" },
          {
            name: "Food",
            name_localizations: { fr: "Nourriture" },
            value: "food",
          },
          {
            name: "Friendship",
            name_localizations: { fr: "Amitié" },
            value: "friendship",
          },
          {
            name: "Health",
            name_localizations: { fr: "Santé" },
            value: "health",
          },
          {
            name: "History",
            name_localizations: { fr: "Histoire" },
            value: "history",
          },
          { name: "Hope", name_localizations: { fr: "Espoir" }, value: "hope" },
          {
            name: "Humor",
            name_localizations: { fr: "Humour" },
            value: "humor",
          },
          {
            name: "Inspirational",
            name_localizations: { fr: "Inspiration" },
            value: "inspirational",
          },
          {
            name: "Knowledge",
            name_localizations: { fr: "Connaissances" },
            value: "knowledge",
          },
          {
            name: "Leadership",
            name_localizations: { fr: "Autorité" },
            value: "leadership",
          },
          {
            name: "Learning",
            name_localizations: { fr: "Apprentissage" },
            value: "learning",
          },
          { name: "Life", name_localizations: { fr: "Vie" }, value: "life" },
          { name: "Love", name_localizations: { fr: "Amour" }, value: "love" },
          {
            name: "Money",
            name_localizations: { fr: "Argent" },
            value: "money",
          },
          {
            name: "Success",
            name_localizations: { fr: "Succès" },
            value: "success",
          },
        ],
      },
    ],
  },
  async execute(interaction) {
    const category = interaction.options.getString("category");
    await interaction.deferReply();
    const quoteData = await fetchInspirationalQuote(category);
    if (quoteData) {
      if (interaction.locale === "fr") {
        try {
          let translation;

          const translationResponse = await translate({
            auth_key: "01be6c49-b75d-4c6f-b0e7-1cb6c8ddc8bd:fx",
            text: quoteData.quote, // The text to be translated
            target_lang: Language.French, // Translate to French
          });

          // Extract the translated text from the response
          const translatedText = translationResponse.translations[0].text;

          return interaction.editReply({
            embeds: [
              {
                color: 0x6666ff,
                description: `${translatedText}`,
                footer: {
                  text: `Citation écrite par ${quoteData.author}.`,
                },
              },
            ],
          });
        } catch (err) {
          return interaction.editReply({
            embeds: [
              {
                color: 0xff6666,
                title: "Oups!",
                description: `Une erreur est survenue pendant la traduction de la citation. Veuillez réessayer plus tard.`,
              },
            ],
          });
        }
      } else {
        return interaction.editReply({
          embeds: [
            {
              color: 0x6666ff,
              description: quoteData.quote,
              footer: {
                text: `Quote written by ${quoteData.author}.`,
              },
            },
          ],
        });
      }
    } else {
      console.log(
        "Failed to fetch an inspirational quote. Please try again later."
      );
    }
    async function fetchInspirationalQuote(category) {
      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/quotes?category=${category}`,
          {
            headers: {
              "X-Api-Key": "JUDcDsQVPQCsYyMiRRCsig==x86Hvi9twNm8v8iz",
            },
          }
        );
        const quote = response.data[0].quote;
        const author = response.data[0].author;
        return { quote, author };
      } catch (error) {
        console.error("Error fetching inspirational quote:", error.message);
        return null;
      }
    }
  },
};

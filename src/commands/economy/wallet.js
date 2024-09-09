const CommandCounter = require("../../schemas/commandCounter");

module.exports = {
  premium: false,
  cooldown: 3,
  dev: false,
  data: {
    name: "wallet",
    name_localizations: {
      fr: "portefeuille",
    },
    description: "Manage your wallet",
    description_localizations: {
      fr: "Gérer votre portefeuille",
    },
    contexts: [0, 1, 2],
    integration_types: [0, 1],
  },
  async execute(interaction) {
    return interaction.reply({
      embeds: [
        {
          title: interaction.locale === "fr" ? "Oups!" : "Oops!",
          description:
            interaction.locale === "fr"
              ? "Cette commande n'est pas encore disponible au public."
              : "This command is not available to public yet.",
          color: "#ff6666",
          thumbnail: {
            url: interaction.client.user.displayAvatarURL(),
          },
        },
      ],
    });
  },
};

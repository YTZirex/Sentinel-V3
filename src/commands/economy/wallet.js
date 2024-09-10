const CommandCounter = require("../../schemas/commandCounter");
const Economy = require('../../schemas/Economy');

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

    let economyUser = await Economy.findOne({ user: interaction.user.id })

    if (!economyUser)return interaction.reply({
        embeds: [
            {
                color: 0xff6666,
                title: interaction.locale === 'fr' ? "Oups!" : "Oops!",
                description: interaction.locale === 'fr' ? "Vous n'avez pas de compte bancaire."  : "You do not own a bank account.",
                thumbnail: {
                    url: interaction.client.user.displayAvatarURL()
                }
            }
        ]
    });

    return interaction.reply({
        embeds: [
            {
                color: 0x6666ff,
                title: 'Votre portefeuille',
                thumbnail: {
                    url: interaction.user.displayAvatarURL()
                },
                fields: [
                    {
                        name: interaction.locale == 'fr' ?  'Banque' : "Bank",
                        value: 'Sentinel Finances'
                    },
                    {
                        name: interaction.locale == 'fr' ? 'Carte Bancaire' : "Credit Card",
                        value: economyUser.creditCardNumber
                    },
                    {
                        name: 'CVC',
                        value: economyUser.cvc
                    },
                    {
                        name: 'Expiration',
                        value: economyUser.expirationDate
                    },
                    {
                        name: interaction.locale == 'fr' ? 'Solde' : "Amount",
                        value: economyUser.balance
                    }
                ]
            }
        ]
    })
  },
};

const { ApplicationCommandOptionType } = require("discord.js");
let Economy = require("../../schemas/Economy");

module.exports = {
    premium: false,
    cooldown: 10,
    dev: true,
    data: {
        name: 'delete-wallet',
        name_localizations: {
            fr: 'supprimer-portefeuille'
        },
        description: 'Delete your wallet',
        description_localizations: {
            fr: 'Supprimer votre portefeuille'
        },
    contexts: [0, 1, 2],
    integration_types: [0, 1],
    options: [
        {
            name: 'confirm',
            name_localizations: {
                fr: 'confirmer'
            },
            description: 'Please confirm your wallet deletion',
            description_localizations: {
                fr: 'Veuillez confirmer la suppression de votre portefeuille.'
            },
            required: true,
            type: ApplicationCommandOptionType.Boolean
        }
    ]
    },
    async execute(interaction) {
        let confirm = interaction.options.getBoolean('confirm');

        let economyUser = await Economy.findOne({
            user: interaction.user.id
        });

        if (!economyUser) return interaction.reply({
            ephemeral: true,
            embeds: [
                {
                    title: interaction.locale === 'fr' ? "Oups!" : "Oops!",
                    color: 0xff6666,
                    thumbnail: {
                        url: interaction.client.user.displayAvatarURL()
                    }
                }
            ]
        })
    }
}
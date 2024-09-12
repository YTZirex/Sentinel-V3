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
                    },
                    description: interaction.locale === 'fr' ? "Vous ne possédez pas de portefeuille" : "You do not own a wallet"
                }
            ]
        });

        if (confirm == false) return interaction.reply({
            ephemeral: true,
            embeds: [
                {
                    title: interaction.locale === 'fr' ? "Oups!" : "Oops!",
                    color: 0xff6666,
                    thumbnail: {
                        url: interaction.client.user.displayAvatarURL()
                    },
                    description: interaction.locale === 'fr' ? "Vous devez autoriser la confirmation" : "You must authorizte the confirmation"
                }
            ]
        })

        if (economyWallet && confirm == true) {
            try {
                Economy.findOneAndDelete({
                    user: interaction.user.id
                });
                return interaction.reply({
                    embeds: [
                        {
                            color: 0x33cc99,
                            title: interaction.locale === 'fr' ? "Succès!" : "Success!",
                            thumbnail: {
                                url: interaction.user.displayAvatarURL()
                            },
                            description: interaction.locale === 'fr' ? "Votre portefeuille a été supprimé avec succès" : "Your wallet was successfully deleted"
                        }
                    ]
                })
            } catch (err) {
                return interaction.reply({
                    ephemeral: true,
                    embeds: [
                        {
                            title: interaction.locale === 'fr' ? "Oups!" : "Oops!",
                            color: 0xff6666,
                            thumbnail: {
                                url: interaction.client.user.displayAvatarURL()
                            },
                            description: interaction.locale === 'fr' ? "Une erreur est survenue" : "An error has occured"
                        }
                    ]
                })
            }
        } else {
            return interaction.reply({
                ephemeral: true,
                embeds: [
                    {
                        title: interaction.locale === 'fr' ? "Oups!" : "Oops!",
                        color: 0xff6666,
                        thumbnail: {
                            url: interaction.client.user.displayAvatarURL()
                        },
                        description: interaction.locale === 'fr' ? "Une erreur est survenue" : "An error has occured"
                    }
                ]
            })
        }
    }
}
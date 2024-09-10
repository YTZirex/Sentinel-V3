const { ApplicationCommandOptionType } = require("discord.js");
let Economy = require("../../schemas/Economy");

module.exports = {
    premium: false,
    cooldown: 10,
    dev: true,
    data: {
        name: 'create-wallet',
        name_localizations: {
            fr: 'nouveau-portefeuille'
        },
        description: 'Create a new wallet',
        description_localizations: {
            fr: 'Créer un nouveau portefeuille.'
        },
        
    contexts: [0, 1, 2],
    integration_types: [0, 1],
        options: [
            {
                name: 'names',
                name_localizations: {
                    fr: 'noms'
                },
                description: 'Your name',
                description_localizations: {
                    fr: 'Votre nom'
                },
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'birth',
                name_localizations: {
                    fr: 'naissance'
                },
                description: 'Your date of birth (DD/MM/YYYY)',
                description_localizations: {
                    fr: 'Votre date de naissance (JJ/MM/AAAA)'
                },
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'gender',
                name_localizations: {
                    fr: 'sexe'
                },
                description: 'Your gender (F/M)',
                description_localizations: {
                    fr: 'Votre sexe (F/M)'
                },
                type: ApplicationCommandOptionType.String,
                required: false
            }
        ]
    },
    async execute(interaction) {
        let names = interaction.options.getString('names');
        let birth = interaction.options.getString('birth');
        let gender = interaction.options.getString('gender') || 'Unknown';

        let economyUser = await Economy.findOne({
            user: interaction.user.id
        });

        if (economyUser) return interaction.reply({
            ephemeral: true,
            embeds: [
                {
                    color: 0xff6666,
                    title: interaction.locale === 'fr' ? "Oups!" : "Oops!",
                    thumbnail: {
                        url: interaction.client.user.displayAvatarURL()
                    },
                    description: interaction.locale === 'fr' ? "Vous possédez déjà un portefeuille" : "You already own a wallet"
                }
            ]
        })

        
        const dateOfBirthRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

        if (!dateOfBirthRegex.test(birth)) return interaction.reply({
           ephemeral: true,
            embeds: [
                {
                    color: 0xff6666,
                    title: interaction.locale === 'fr' ? "Oups!" : "Oops!",
                    description: interaction.locale === 'fr' ? "Le format de la date de naissance est incorrect (JJ/MM/AAAA)" : "The date of birth format is invalid (DD/MM/YYYY)",
                    thumbnail: {
                        url: interaction.client.user.displayAvatarURL()
                    }
                }
            ]
        });

        
        const birthDateParts = birth.split("/");
        const userBirthDate = new Date(
          parseInt(birthDateParts[2], 10),
          parseInt(birthDateParts[1], 10) - 1,
          parseInt(birthDateParts[0], 10)
        );

        if (userBirthDate > eighteenYearsAgo) return interaction.reply({
            ephemeral: true,
            embeds: [
                {
                    color: 0xff6666,
                    thumbnail: {
                        url: interaction.client.user.displayAvatarURL()
                    },
                    title: interaction.locale === 'fr' ? "Oups!" : "Oops!",
                    description: interaction.locale === 'fr' ? "Vous devez être majeur pour créer un portefeuille." : "You must be atleast 18 years old to create a wallet."
                }
            ]
        });

        if (names.length > 24 || names.length < 6) return interaction.reply({
            ephemeral: true,
            embeds: [
                {
                    title: interaction.locale === 'fr' ? "Oups!" : "Oops!",
                    color: 0xff6666,
                    thumbnail: {
                        url: interaction.client.user.displayAvatarURL()
                    },
                    description: interaction.locale === 'fr' ? "Vos noms doivent être entre 6 et 24 caaractères." : "Your names must be between 6 and 24 characters."
                }
            ]
        });
     
        let uniqueCreditNumber = await generateCreditCard();
        let crypto = await generateRandomNumber();

        try {
            economyUser = await Economy.create({
                user: interaction.user.id,
                names: names,
                dateOfBirth: birth,
                gender: gender,
                balance: 0,
                creditCardNumber: uniqueCreditNumber,
                cvc: crypto,
                expirationDate: "11/27",
            });
            await economyUser.save();

            return interaction.reply({
                embeds: [
                    {
                        color: 0x33cc99, 
                        title: interaction.locale === 'fr' ? "Succès!" : "Success!",
                        thumbnail: {
                            url: interaction.user.displayAvatarURL()
                        },
                        description: interaction.locale === 'fr' ? "Votre portefeuille a été généré avec succès" : "Your wallet was successfully created"
                    }
                ]
            })
            
        } catch (err) {
            return interaction.reply({
                ephemeral: true,
                embeds: [
                    {
                        color: 0xff6666,
                        title: interaction.locale === 'fr' ? "Oups!" : "Oops!",
                        thumbnail: {
                            url: interaction.client.user.displayAvatarURL()
                        },
                        description: interaction.locale === 'fr' ? "Une erreur est survenue lors de la création de votre portefeuille" : "An error occured while creating your wallet"
                    }
                ]
            })
        }

    }
}

function generateRandomNumber() {
    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * 999) + 1;
    } while (randomNumber === 0);

    // Add leading zero for numbers between 1 and 99
    return randomNumber < 100
      ? `00${randomNumber}`.slice(-3)
      : randomNumber.toString();
  }

 async function generateCreditCard() {
    const prefix = "4098 ";

    let isUnique = false;
    let generatedNumber;

    while (!isUnique) {
      const randomDigits = Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * 10)
      ).join("");

      // Add a space every four digits after the prefix
      const formattedNumber = prefix + randomDigits.replace(/(.{4})/g, "$1 ");

      generatedNumber = formattedNumber.trim(); // Remove trailing space

      // Check if the generated number already exists in the database
      const existingRecord = await Economy.findOne({
        creditCardNumber: generatedNumber.toString(),
      });

      if (!existingRecord) {
        isUnique = true;
      }
      // If the number already exists, generate a new one in the next iteration
    }

    return generatedNumber;
  }

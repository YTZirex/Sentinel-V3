const TicTacToe = require("discord-tictactoe");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  cooldown: 5,
  dev: false,
  premium: false,
  data: {
    name: "tictactoe",
    name_localizations: {
      fr: "morpion",
    },
    description: "Play a game of tic tac toe.",
    description_localizations: {
      fr: `Jouer au morpion.`,
    },
    options: [
      {
        name: "opponent",
        name_localizations: {
          fr: "adversaire",
        },
        required: false,
        description: "The opponent to play with.",
        type: ApplicationCommandOptionType.User,
        description_localizations: {
          fr: "L'adversaire avec lequel jouer.",
        },
      },
    ],
  },
  async execute(i) {
    let game = new TicTacToe({ language: i.locale === "fr" ? "fr" : "en" });

    game.handleInteraction(i);
  },
};

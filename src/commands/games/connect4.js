const { Connect4 } = require("discord-gamecord");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  cooldown: 5,
  premium: false,
  dev: false,
  data: {
    name: "connect4",
    name_localizations: {
      fr: "puissance4",
    },
    description: "Play a game of Connect 4.",
    description_localizations: {
      fr: "Jouer au Puissance 4.",
    },
    options: [
      {
        name: "opponent",
        name_localizations: {
          fr: "adversaire",
        },
        required: true,
        description: "The opponent to play with.",
        type: ApplicationCommandOptionType.User,
        description_localizations: {
          fr: "L'adversaire avec lequel jouer.",
        },
      },
    ],
  },
  async execute(i) {
    const opponent = i.options.getUser("opponent");

    const Game = new Connect4({
      message: i,
      isSlashGame: true,
      opponent: opponent,
      embed: {
        title: i.locale === "fr" ? "Puissance 4" : "Connect 4",
        statusTitle: "Status",
        color: "#6666FF",
      },
      emojis: {
        board: "⚪",
        player1: "🔴",
        player2: "🟡",
      },
      mentionUser: true,
      timeoutTime: 60000,
      buttonStyle: "PRIMARY",
      turnMessage:
        i.locale === "fr"
          ? "{emoji} | C'est au tour de **{player}**."
          : "{emoji} | Its turn of player **{player}**.",
      winMessage:
        i.locale === "fr"
          ? "{emoji} | **{player}** a gagné la partie."
          : "{emoji} | **{player}** won the game.",
      tieMessage:
        i.locale === "fr"
          ? "Égalité! Personne n'a gagné la partie."
          : "The Game tied! No one won the Game.",
      timeoutMessage:
        i.locale === "fr"
          ? "La partie ne s'est pas terminée! Personne n'a gagné."
          : "The Game went unfinished! No one won the Game!",
      playerOnlyMessage:
        i.locale === "fr"
          ? "Seul {player} et {opponent} peuvent utiliser ces boutons."
          : "Only {player} and {opponent} can use these buttons.",
    });

    Game.startGame();
    Game.on("gameOver", (result) => {
      console.log(result); // =>  { result... }
    });
  },
};

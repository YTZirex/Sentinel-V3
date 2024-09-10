const { TwoZeroFourEight } = require("discord-gamecord");

module.exports = {
  cooldown: 5,
  premium: false,
  dev: false,
  data: {
    name: "2048",
    description: "Play a game of 2048.",
    description_localizations: {
      fr: "Jouer au 2048.",
    },
  },
  async execute(i) {
    const Game = new TwoZeroFourEight({
      message: i,
      isSlashGame: true,
      embed: {
        title: "2048",
        color: "#6666FF",
      },
      emojis: {
        up: "⬆️",
        down: "⬇️",
        left: "⬅️",
        right: "➡️",
      },
      timeoutTime: 60000,
      buttonStyle: "PRIMARY",
      playerOnlyMessage:
        i.locale === "fr"
          ? "Seul {player} peut utiliser ces boutons."
          : "Only {player} can use these buttons.",
    });

    Game.startGame();
    Game.on("gameOver", (result) => {
      console.l;
    });
  },
};

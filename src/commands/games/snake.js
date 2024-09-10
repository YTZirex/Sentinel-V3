const { Snake } = require("discord-gamecord");

module.exports = {
  cooldown: 5,
  dev: false,
  premium: false,
  data: {
    name: "snake",
    description: "Play a game of Snake.",
    description_localizations: {
      fr: "Jouer au Snake.",
    },
  },
  async execute(i) {
    const game = new Snake({
      message: i,
      isSlashGame: true,
      embed: {
        title: "Snake",
        overTitle: i.locale === "fr" ? "Fin du jeu" : "Game Over",
        color: "#6666FF",
      },
      emojis: {
        board: "⬛",
        food: "🍎",
        up: "⬆️",
        down: "⬇️",
        left: "⬅️",
        right: "➡️",
      },
      snake: { head: "🟢", body: "🟩", tail: "🟢", skull: "💀" },
      foods: ["🍎", "🍇", "🍊", "🫐", "🥕", "🥝", "🌽"],
      stopButton: "Stop",
      timeoutTime: 60000,
      playerOnlyMessage:
        i.locale === "fr"
          ? `Seul {player} peut utiliser ces boutons.`
          : "Only {player} can use these buttons.",
    });

    game.startGame();
    game.on("gameOver", (res) => {
      return;
    });
  },
};

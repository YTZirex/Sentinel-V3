const { Slots } = require("discord-gamecord");

module.exports = {
  premium: false,
  cooldown: 5,
  dev: false,
  data: {
    name: "slots",
    description: "Play slots",
    description_localizations: {
      fr: `Jouer au machine à sous.`,
    },
  },
  async execute(i) {
    const Game = new Slots({
      message: i,
      isSlashGame: true,
      embed: {
        title: i.locale === "fr" ? "Machine à sous" : "Slot Machine",
        color: "#6666FF",
      },
      slots: ["🍇", "🍊", "🍋", "🍌"],
    });

    Game.startGame();
    Game.on("gameOver", (result) => {
      console.log(result); // =>  { result... }
    });
  },
};

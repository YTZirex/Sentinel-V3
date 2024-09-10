const { Events } = require("discord.js");
const interactionCreate = require("./interactionCreate");
module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(msg) {
    if (msg.author.bot) return false;
    if (msg.content.includes(`<@${msg.client.user.id}>`)) {
      return msg.reply({
        embeds: [
          {
            color: 0x6666ff,
            title: "Coucou!",
            thumbnail : { url: msg.client.user.displayAvatarURL() },
            description: `Je suis Sentinel V3! La futur version de Sentinel.\n\nActuellement je ne propose aucune commandes disponibles au public car je suis en développement. Mais je donnerais des informations sur moi bientôt :shushing_face:`,
          },
        ],
      });
    }
  },
};

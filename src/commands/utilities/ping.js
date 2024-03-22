const GuildConfig = require("../../schemas/guildConfig");
const UserPreferences = require("../../schemas/userPreferences");

module.exports = {
  data: {
    name: "ping",
    description: "Get the bot's latencies.",
    description_localizations: {
      fr: "Obtenir les latences du bot",
    },
    integration_types: [0, 1],
    contexts: [0, 1, 2],
  },
  cooldown: 5,
  dev: false,
  premium: false,
  async execute(interaction) {
    let preferences;
    if (interaction.guild == null) {
      preferences = await UserPreferences.findOne({
        id: interaction.user.id,
      });
    } else {
      preferences = await GuildConfiguildConfig.findOne({
        id: interaction.guild.id,
      });
    }
    const start = performance.now();
    const apiLatency = interaction.client.ws.ping;

    const mongooseStart = Date.now();
    const mongooseLatency = Date.now() - mongooseStart;

    await interaction.deferReply();
    const end = performance.now();
    const botPing = Math.floor(end - start);
    return interaction.editReply({
      embeds: [
        {
          title:
            preferences & (preferences.language === "fr")
              ? `Latences des services de **${interaction.client.user.username}**`
              : `**${interaction.client.user.username}**'s services latencies`,
          description:
            preferences & (preferences.language === "fr")
              ? `> \`⏱️\` La latence du **Bot** est \`${botPing}ms\`\n
                > \`🌐\` La latence de l'**API Discord** est \`${apiLatency}ms\`\n
                > \`💾\` La latence de la **Base de données** est \`${mongooseLatency}ms\``
              : `> \`⏱️\` **Bot**'s latency is \`${botPing}ms\`\n
                > \`🌐\` **Discord API**'s latency is \`${apiLatency}ms\`\n
                > \`💾\` **Database**'s latency is \`${mongooseLatency}ms\``,
          color: 0x7289da,
          author: {
            name: interaction.user.username,
            icon_url: interaction.user.displayAvatarURL(),
          },
          footer: {
            text:
              preferences & (preferences.language === "fr")
                ? `Demandé par ${interaction.user.username}`
                : `Requested by ${interaction.user.username}`,
            icon_url: interaction.client.user.displayAvatarURL(),
          },
          // timestamp: `${new Date()}`,
          thumbnail: {
            url: interaction.client.user.displayAvatarURL(),
          },
        },
      ],
    });
  },
};

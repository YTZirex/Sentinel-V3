const {
  Events,
  PermissionsBitField,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  cooldown: 3,
  dev: true,
  premium: false,
  data: {
    name: "emit",
    description: "Emit an event.",
    dm_permission: false,
    options: [
      {
        name: "event",
        description: "The event to emit",
        required: true,
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "GuildCreate",
            value: Events.GuildCreate,
          },

          {
            name: "GuildDelete",
            value: Events.GuildDelete,
          },
        ],
      },
    ],
  },
  async execute(interaction) {
    const event = interaction.options.getString("event");

    if (event == Events.GuildCreate || event == Events.GuildDelete) {
      interaction.client.emit(event, interaction.guild);
    }

    return interaction.reply({
      embeds: [
        {
          color: 0x33cc99,
          description: `✅ Emitted event - \`${event}\``,
        },
      ],
      ephemeral: true,
    });
  },
};

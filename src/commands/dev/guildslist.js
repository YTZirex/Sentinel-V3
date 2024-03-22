module.exports = {
  cooldown: 3,
  premium: false,
  dev: true,
  data: {
    name: "guildslist",
    description: "list of guilds",
  },
  async execute(interaction) {
    const guildsInfo = [];

    // Loop through each guild the bot is in
    interaction.client.guilds.cache.forEach((guild) => {
      // Create an object containing ID, name, and member count of the guild
      const guildInfo = {
        id: guild.id,
        name: guild.name,
        memberCount: guild.memberCount,
      };

      // Push the guild info object into the array
      guildsInfo.push(guildInfo);
    });

    interaction.reply(`Sent the informations in the console.`);

    // Log the array containing guild information
    console.log("Guilds Information:", guildsInfo);
  },
};

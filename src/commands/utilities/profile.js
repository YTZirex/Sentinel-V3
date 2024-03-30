const { profileImage } = require("discord-arts");
const {
  AttachmentBuilder,
  ApplicationCommandOptionType,
  GuildMember,
  Guild,
} = require("discord.js");
const BlacklistedUser = require("../../schemas/blacklistedUser");
const PremiumUser = require("../../schemas/premiumUser");
const CommandCounter = require("../../schemas/commandCounter");

module.exports = {
  cooldown: 3,
  premium: false,
  dev: false,
  data: {
    contexts: [0, 1, 2],
    integration_types: [0, 1],
    name: "profile",
    description: `Get the user's profile`,
    description_localizations: {
      fr: `Récupérer le profile de l'utilisateur.`,
    },
    options: [
      {
        name: "user",
        name_localizations: {
          fr: "utilisateur",
        },
        description: `Select a user.`,
        description_localizations: {
          fr: `Sélectionnez un utilisateur.`,
        },
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
  async execute(interaction) {
    const target = interaction.options.getUser("user") || interaction.user;
    let commandCounter = await CommandCounter.findOne({
      global: 1,
    });

    commandCounter.profile.used += 1;
    await commandCounter.save();
    await interaction.deferReply();

    let customs = [];

    let blacklistedUser = await BlacklistedUser.findOne({
      id: target.id,
    });

    let premiumUser = await PremiumUser.findOne({
      "redeemedBy.id": target.id,
    });

    if (premiumUser)
      customs.push(
        "https://cdn.discordapp.com/attachments/1220431086417608734/1223275749876695182/9620-ownercrown.png?ex=66194352&is=6606ce52&hm=4bfaf64713866ada7130c1742381e4a4f2d86c3b709a21cecc54b1efd92fad64&"
      );
    if (blacklistedUser && blacklistedUser.blacklisted === true)
      customs.push(
        "https://cdn.discordapp.com/attachments/1220431086417608734/1223275750115905536/8916-ban800.png?ex=66194352&is=6606ce52&hm=8044467c88a2bd8606dcbbff803af46d81e688ad4ac24edfb71a70f25f38f6df&"
      );

    if (target.id === "860281357014794241") {
      customs.push(
        "https://cdn.discordapp.com/attachments/1220431086417608734/1223275750526812180/6289-terminal.png?ex=66194352&is=6606ce52&hm=8a48634829595a36d006f458bbc2de2163cd847e0081ae7a1cb9749ec64431e5&"
      );

      customs.push(
        "https://cdn.discordapp.com/attachments/1220431086417608734/1223275750304518206/7300-moderator.png?ex=66194352&is=6606ce52&hm=a21723c2c7bcfa2c862d9b46778da3d026eb513746dd354a6fec7857a02de0a6&"
      );

      customs.push(
        "https://cdn.discordapp.com/attachments/1220431086417608734/1223275750795382795/3825-admin.png?ex=66194352&is=6606ce52&hm=b5335d6c55fe5e1805d326b183619eed454ae38a11621e7fe8d510eca2bf88fd&"
      );
    }

    if (target.id === "457508731438235648") {
      customs.push(
        "https://cdn.discordapp.com/attachments/1220431086417608734/1223275750304518206/7300-moderator.png?ex=66194352&is=6606ce52&hm=a21723c2c7bcfa2c862d9b46778da3d026eb513746dd354a6fec7857a02de0a6&"
      );

      customs.push(
        "https://cdn.discordapp.com/attachments/1220431086417608734/1223275750795382795/3825-admin.png?ex=66194352&is=6606ce52&hm=b5335d6c55fe5e1805d326b183619eed454ae38a11621e7fe8d510eca2bf88fd&"
      );
    }

    if (target.id === "692677634315911209") {
      customs.push(
        "https://cdn.discordapp.com/attachments/1220431086417608734/1223276666583912589/5630-discord-nitro.png?ex=6619442c&is=6606cf2c&hm=ae86a40dbda66ecf93e698383ae8d3e991860ebfd4f3b816d3c032269b846f6f&"
      );

      customs.push(
        "https://cdn.discordapp.com/attachments/1220431086417608734/1223275750304518206/7300-moderator.png?ex=66194352&is=6606ce52&hm=a21723c2c7bcfa2c862d9b46778da3d026eb513746dd354a6fec7857a02de0a6&"
      );

      customs.push(
        "https://cdn.discordapp.com/attachments/1220431086417608734/1223275750795382795/3825-admin.png?ex=66194352&is=6606ce52&hm=b5335d6c55fe5e1805d326b183619eed454ae38a11621e7fe8d510eca2bf88fd&"
      );
    }

    const buffer = await profileImage(target.id, {
      customBadges: customs,
      badgesFrame: true,
      backgroundBrightness: 100,
      removeAvatarFrame: false,
      moreBackgroundBlur: true,
    });

    let attachment = new AttachmentBuilder(buffer).setName(`profile.png`);
    return interaction.editReply({
      files: [attachment],
    });
  },
};

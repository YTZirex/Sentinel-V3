const ms = require("ms");
const os = require("os");
const { version, dependencies } = require(`${process.cwd()}/package.json`);
const { botVersion } = require("../../../data/config.json");

module.exports = {
  cooldown: 3,
  premium: false,
  dev: false,
  data: {
    name: "botinfo",
    name_localizations: {
      fr: "info-bot",
    },
    description: "Get informations about the bot.",
    description_localizations: {
      fr: "Obtenir des informations sur le bot.",
    },
    integration_types: [0, 1],
    contexts: [0, 1, 2],
  },
  async execute(interaction) {
    return interaction.reply({
      embeds: [
        {
          title: ":question:  Sentinel : Informations",
          color: 0x6666ff,
          thumbnail: { url: interaction.client.user.displayAvatarURL() },
          description: `
                  __**${
                    interaction.locale === "fr"
                      ? "Informations Bot"
                      : "Bot Informations"
                  }**__
                  > **${
                    interaction.locale === "fr" ? "Utilisateur" : "User"
                  }:** ${interaction.client.user.tag} - ${
            interaction.client.user.id
          }
                  > **${
                    interaction.locale === "fr"
                      ? "Compte crée"
                      : "Account Created"
                  }:** <t:${(
            interaction.client.user.createdTimestamp / 1000
          ).toFixed(0)}:R>
                  > **${
                    interaction.locale === "fr" ? "Commandes" : "Commands"
                  }:** ${interaction.client.commands.size}
                  > **${
                    interaction.locale === "fr"
                      ? "Version DiscordJS"
                      : "DiscordJS Version"
                  }:** ${dependencies["discord.js"]} ${shardExist()}
                  > **${
                    interaction.locale === "fr"
                      ? "Version Node"
                      : "Node Version"
                  }:** ${process.version}
                  > **${
                    interaction.locale === "fr" ? "Version Bot" : "Bot Version"
                  }:** ${botVersion}
                  > **${
                    interaction.locale === "fr" ? "Dépendances" : "Dependencies"
                  }:** ${Object.keys(dependencies).length} 
                  > **${
                    interaction.locale === "fr" ? "Disponibilité" : "Uptime"
                  }:** ${uptimeString(Math.floor(process.uptime()))}
        
                  __**${
                    interaction.locale === "fr"
                      ? "Informations Serveur"
                      : "Guild Informations"
                  }**__
                  > **${
                    interaction.locale === "fr" ? "Serveurs" : "Guilds"
                  }:** ${separateNumbers(
            (await interaction.client.guilds.fetch()).size
          )}
                  > **${
                    interaction.locale === "fr" ? "Utilisateurs" : "Users"
                  }:** ${separateNumbers(
            interaction.client.guilds.cache
              .map((guild) => guild.memberCount)
              .reduce((a, b) => a + b, 0)
          )}
                  > **${
                    interaction.locale === "fr" ? "Salons" : "Channels"
                  }:** ${separateNumbers(
            await interaction.client.channels.cache.size
          )}
        
                  __**${
                    interaction.locale === "fr"
                      ? "Informations Système"
                      : "System Informations"
                  }**__
                  > **${
                    interaction.locale === "fr"
                      ? "Système d'Exploitation"
                      : "Operating System"
                  }:** ${process.platform}
                  > **${
                    interaction.locale === "fr" ? "Processeur" : "CPU"
                  }:** ${os.cpus()[0].model.trim()}
                  > **${
                    interaction.locale === "fr"
                      ? "Utilisation Mémoire"
                      : "RAM Usage"
                  }:** ${formatBytes(
            process.memoryUsage().heapUsed
          )} / ${formatBytes(os.totalmem())}
        
                  __**${
                    interaction.locale === "fr"
                      ? "Equipe de Développement"
                      : "Development Team"
                  }:**__
                  > **${
                    interaction.locale === "fr" ? "Créateurs" : "Creators"
                  }**: Fadzuk, Matt, Slipers
                  > **${
                    interaction.locale === "fr" ? "Développeurs" : "Developers"
                  }:** Matt
                  `,
        },
      ],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 5,
              label:
                interaction.locale === "fr" ? "Invite moi !" : "Invite me !",
              url: "https://discord.com/oauth2/authorize?client_id=1219771920321347676",
              emoji: "🔗",
            },
            {
              type: 2,
              style: 5,
              label: "Support",
              url: "https://discord.gg/wuETgs5mSa",
              emoji: "💬",
            },
          ],
        },
      ],
    });

    function formatBytes(bytes) {
      if (bytes == 0) return "0";

      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));

      return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${
        sizes[i]
      }`;
    }
    function uptimeString(seconds) {
      // eslint-disable-next-line prefer-const
      let days = Math.floor(seconds / (3600 * 24));
      seconds -= days * 3600 * 24;
      // eslint-disable-next-line prefer-const
      let hours = Math.floor(seconds / 3600);
      seconds -= hours * 3600;
      // eslint-disable-next-line prefer-const
      let minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      return interaction.locale === "fr"
        ? `${days} jours, ${hours} heures, ${minutes} minutes, et ${seconds} secondes`
        : `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
    }

    function separateNumbers(number) {
      // Convert the number to a string
      let numberString = number.toString();

      // Split the string into groups of three digits from the end
      let separatedNumber = [];
      let group = "";
      for (let i = numberString.length - 1; i >= 0; i--) {
        group = numberString[i] + group;
        if (group.length === 3 || i === 0) {
          separatedNumber.unshift(group);
          group = "";
        }
      }

      // Join the groups with spaces
      return separatedNumber.join(" ");
    }

    function shardExist() {
      if (interaction.guild == null) return "";
      return `(shard **#${interaction.guild.shardId}**)`;
    }
  },
};

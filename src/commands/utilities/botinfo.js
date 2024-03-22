const ms = require("ms");
const os = require("os");
const GuildConfig = require("../../schemas/guildConfig");
const UserPreferences = require("../../schemas/userPreferences");
const { version, dependencies } = require(`${process.cwd()}/package.json`);
const { botVersion } = require("../../../data/config.json");
const guildConfig = require("../../schemas/guildConfig");
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
    let preferences;
    if (interaction.guild === null) {
      preferences = await UserPreferences.findOne({
        id: interaction.user.id,
      });
    } else {
      preferences = await guildConfig.findOne({
        id: interaction.guild.id,
      });
    }
    if (interaction.guild == null) {
      if (preferences && preferences.language) {
        return interaction.reply({
          embeds: [
            {
              title: ":question:  Sentinel : Informations",
              color: 0x6666ff,
              thumbnail: { url: interaction.client.user.displayAvatarURL() },
              description: `
                        __**${
                          preferences.language === "fr"
                            ? "Informations Bot"
                            : "Bot Info"
                        }**__
                        > **${
                          preferences.language === "fr" ? "Utilisateur" : "User"
                        }:** ${interaction.client.user?.tag} - ${
                interaction.client.user?.id
              }
                        > **${
                          preferences.language === "fr"
                            ? "Compte crée"
                            : "Account Created"
                        }:** <t:${(
                interaction.client.user.createdTimestamp / 1000
              ).toFixed(0)}:R>
                        > **${
                          preferences.language === "fr"
                            ? "Commandes"
                            : "Commands"
                        }:** ${interaction.client.commands.size}
                        > **${
                          preferences.language === "fr"
                            ? "Version DiscordJS"
                            : "DiscordJS Version"
                        }:** ${dependencies["discord.js"]}
                        > **${
                          preferences.language === "fr"
                            ? "Version Node"
                            : "Node Version"
                        }:** ${process.version}
                        > **${
                          preferences.language === "fr"
                            ? "Version Bot:"
                            : "Bot Version"
                        }:** ${botVersion}
                        > **${
                          preferences.language === "fr"
                            ? "Dépendances"
                            : "Dependencies"
                        }:** ${Object.keys(dependencies).length}
                        > **${
                          preferences.language === "fr"
                            ? "Disponibilité"
                            : "Uptime"
                        }:** ${uptimeString(Math.floor(process.uptime()))}
              
                        __**${
                          preferences.language === "fr"
                            ? "Informations Serveur"
                            : "Guild Info"
                        }**__
                        > **${
                          preferences.language === "fr" ? "Serveurs" : "Guilds"
                        }:** ${separateNumbers(
                (await interaction.client.guilds.fetch()).size
              )}
                        > **${
                          preferences.language === "fr"
                            ? "Utilisateurs"
                            : "Users"
                        }:** ${separateNumbers(
                interaction.client.guilds.cache
                  .map((guild) => guild.memberCount)
                  .reduce((a, b) => a + b, 0)
              )}
                        > **${
                          preferences.language === "fr" ? "Salons" : "Channels"
                        }:** ${separateNumbers(
                await interaction.client.channels.cache.size
              )}
              
                        __**${
                          preferences.language === "fr"
                            ? "Informations Système"
                            : "System Info"
                        }**__
                        > **${
                          preferences.language === "fr"
                            ? "Système d'exploitation"
                            : "Operating System"
                        }:** ${process.platform}
                        > **${
                          preferences.language === "fr" ? "Processeur" : "CPU"
                        }:** ${os.cpus()[0].model.trim()}
                        > **${
                          preferences.language === "fr"
                            ? "Utilisation Mémoire"
                            : "RAM Usage"
                        }:** ${formatBytes(
                process.memoryUsage().heapUsed
              )} / ${formatBytes(os.totalmem())}
              
                        __**${
                          preferences.language === "fr"
                            ? "Equipe de développement"
                            : "Development Team"
                        }:**__
                        > **${
                          preferences.language === "fr"
                            ? "Créateurs"
                            : "Creators"
                        }**: Fadzuk, Matt, Slipers
                        > **${
                          preferences.language === "fr"
                            ? "Développeurs"
                            : "Developers"
                        }**: Matt
                        `,
            } /*
                      new EmbedBuilder()
                        .setThumbnail(interaction.client.user?.displayAvatarURL()!)
                        .setColor("Random").setDescription(`
                              __**Bot Info**__
                              > **User:** ${interaction.client.user?.tag} - ${interaction.client.user?.id}
                              > **Account Created:** <t:${(
                                interaction.client.user.createdTimestamp / 1000
                              ).toFixed(0)}:R>
                              > **Commands:** ${interaction.client.commands.size}
                              > **DiscordJS Version:** ${version}
                              > **Node Version:** ${process.version}
                              > **Bot Version:** ${botVersion}
                              > **Dependencies:** ${Object.keys(dependencies).length}
                              > **Uptime:** ${uptimeString(Math.floor(process.uptime()))}
              
                              __**Guild Info**__
                              > **Total Guilds:** ${(await interaction.client.guilds.fetch()).size}
                              > **Total Members:** ${interaction.client.guilds.cache
                                .map((guild) => guild.memberCount)
                                .reduce((a, b) => a + b, 0)}
                              > **Total Channels:** ${await interaction.client.channels.cache.size}
              
                              __**System Info**__
                              > **Operating System:** ${process.platform}
                              > **CPU:** ${os.cpus()[0].model.trim()}
                              > **RAM Usage:** ${formatBytes(
                                process.memoryUsage().heapUsed
                              )} / ${formatBytes(os.totalmem())}
              
                              __**Development Team:**__
                              > **Creators**: Fadzuk, Matt
                              > **Developers:** Matt
                              `),*/,
          ],
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  style: 5,
                  label:
                    preferences.language === "fr"
                      ? "Invite moi !"
                      : "Invite me !",
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
          /*
                    components: [
                      new ActionRowBuilder<ButtonBuilder>().addComponents(
                        new ButtonBuilder()
                          .setLabel(`Invite me!`)
                          .setStyle(ButtonStyle.Link)
                          .setURL(
                            "https://discord.com/oauth2/authorize?client_id=1219771920321347676"
                          ),
                        new ButtonBuilder()
                          .setLabel("Support Server")
                          .setStyle(ButtonStyle.Link)
                          .setURL("https://https://discord.gg/wuETgs5mSa")
                      ),
                    ],*/
        });
      } else {
        // DONT CHANGE DONT CHANGE
        interaction.reply({
          embeds: [
            {
              title: ":question:  Sentinel : Informations",
              color: 0x6666ff,
              thumbnail: { url: interaction.client.user.displayAvatarURL() },
              description: `
                        __**Bot Info**__
                        > **User:** ${interaction.client.user?.tag} - ${
                interaction.client.user?.id
              }
                        > **Account Created:** <t:${(
                          interaction.client.user.createdTimestamp / 1000
                        ).toFixed(0)}:R>
                        > **Commands:** ${interaction.client.commands.size}
                        > **DiscordJS Version:** ${dependencies["discord.js"]}
                        > **Node Version:** ${process.version}
                        > **Bot Version:** ${botVersion}
                        > **Dependencies:** ${Object.keys(dependencies).length}
                        > **Uptime:** ${uptimeString(
                          Math.floor(process.uptime())
                        )}
              
                        __**Guild Info**__
                        > **Total Guilds:** ${separateNumbers(
                          (await interaction.client.guilds.fetch()).size
                        )}
                        > **Total Members:** ${separateNumbers(
                          interaction.client.guilds.cache
                            .map((guild) => guild.memberCount)
                            .reduce((a, b) => a + b, 0)
                        )}
                        > **Total Channels:** ${separateNumbers(
                          await interaction.client.channels.cache.size
                        )}
              
                        __**System Info**__
                        > **Operating System:** ${process.platform}
                        > **CPU:** ${os.cpus()[0].model.trim()}
                        > **RAM Usage:** ${formatBytes(
                          process.memoryUsage().heapUsed
                        )} / ${formatBytes(os.totalmem())}
              
                        __**Development Team:**__
                        > **Creators**: Fadzuk, Matt, Slipers
                        > **Developers:** Matt
                        `,
            } /*
                      new EmbedBuilder()
                        .setThumbnail(interaction.client.user?.displayAvatarURL()!)
                        .setColor("Random").setDescription(`
                              __**Bot Info**__
                              > **User:** ${interaction.client.user?.tag} - ${interaction.client.user?.id}
                              > **Account Created:** <t:${(
                                interaction.client.user.createdTimestamp / 1000
                              ).toFixed(0)}:R>
                              > **Commands:** ${interaction.client.commands.size}
                              > **DiscordJS Version:** ${version}
                              > **Node Version:** ${process.version}
                              > **Bot Version:** ${botVersion}
                              > **Dependencies:** ${Object.keys(dependencies).length}
                              > **Uptime:** ${uptimeString(Math.floor(process.uptime()))}
              
                              __**Guild Info**__
                              > **Total Guilds:** ${(await interaction.client.guilds.fetch()).size}
                              > **Total Members:** ${interaction.client.guilds.cache
                                .map((guild) => guild.memberCount)
                                .reduce((a, b) => a + b, 0)}
                              > **Total Channels:** ${await interaction.client.channels.cache.size}
              
                              __**System Info**__
                              > **Operating System:** ${process.platform}
                              > **CPU:** ${os.cpus()[0].model.trim()}
                              > **RAM Usage:** ${formatBytes(
                                process.memoryUsage().heapUsed
                              )} / ${formatBytes(os.totalmem())}
              
                              __**Development Team:**__
                              > **Creators**: Fadzuk, Matt
                              > **Developers:** Matt
                              `),*/,
          ],
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  style: 5,
                  label: "Invite me !",
                  url: "https://discord.com/oauth2/authorize?client_id=1219771920321347676",
                  emoji: "🔗",
                },
                {
                  type: 2,
                  style: 5,
                  label: "Support Server",
                  url: "https://discord.gg/wuETgs5mSa",
                  emoji: "💬",
                },
              ],
            },
          ],
          /*
                    components: [
                      new ActionRowBuilder<ButtonBuilder>().addComponents(
                        new ButtonBuilder()
                          .setLabel(`Invite me!`)
                          .setStyle(ButtonStyle.Link)
                          .setURL(
                            "https://discord.com/oauth2/authorize?client_id=1219771920321347676"
                          ),
                        new ButtonBuilder()
                          .setLabel("Support Server")
                          .setStyle(ButtonStyle.Link)
                          .setURL("https://https://discord.gg/wuETgs5mSa")
                      ),
                    ],*/
        });
      }
    } else {
      if (preferences && preferences.language) {
        return interaction.reply({
          embeds: [
            {
              title: ":question:  Sentinel : Informations",
              color: 0x6666ff,
              thumbnail: { url: interaction.client.user.displayAvatarURL() },
              description: `
                    __**${
                      preferences.language === "fr"
                        ? "Informations Bot"
                        : "Bot Info"
                    }**__
                    > **${
                      preferences.language === "fr" ? "Utilisateur" : "User"
                    }:** ${interaction.client.user?.tag} - ${
                interaction.client.user?.id
              }
                    > **${
                      preferences.language === "fr"
                        ? "Compte crée"
                        : "Account Created"
                    }:** <t:${(
                interaction.client.user.createdTimestamp / 1000
              ).toFixed(0)}:R>
                    > **${
                      preferences.language === "fr" ? "Commandes" : "Commands"
                    }:** ${interaction.client.commands.size}
                    > **${
                      preferences.language === "fr"
                        ? "Version DiscordJS"
                        : "DiscordJS Version"
                    }:** ${dependencies["discord.js"]} (shard **#${
                interaction.guild.shardId
              }**)
                    > **${
                      preferences.language === "fr"
                        ? "Version Node"
                        : "Node Version"
                    }:** ${process.version}
                    > **${
                      preferences.language === "fr"
                        ? "Version Bot:"
                        : "Bot Version"
                    }:** ${botVersion}
                    > **${
                      preferences.language === "fr"
                        ? "Dépendances"
                        : "Dependencies"
                    }:** ${Object.keys(dependencies).length}
                    > **${
                      preferences.language === "fr" ? "Disponibilité" : "Uptime"
                    }:** ${uptimeString(Math.floor(process.uptime()))}
          
                    __**${
                      preferences.language === "fr"
                        ? "Informations Serveur"
                        : "Guild Info"
                    }**__
                    > **${
                      preferences.language === "fr" ? "Serveurs" : "Guilds"
                    }:** ${separateNumbers(
                (await interaction.client.guilds.fetch()).size
              )}
                    > **${
                      preferences.language === "fr" ? "Utilisateurs" : "Users"
                    }:** ${separateNumbers(
                interaction.client.guilds.cache
                  .map((guild) => guild.memberCount)
                  .reduce((a, b) => a + b, 0)
              )}
                    > **${
                      preferences.language === "fr" ? "Salons" : "Channels"
                    }:** ${separateNumbers(
                await interaction.client.channels.cache.size
              )}
          
                    __**${
                      preferences.language === "fr"
                        ? "Informations Système"
                        : "System Info"
                    }**__
                    > **${
                      preferences.language === "fr"
                        ? "Système d'exploitation"
                        : "Operating System"
                    }:** ${process.platform}
                    > **${
                      preferences.language === "fr" ? "Processeur" : "CPU"
                    }:** ${os.cpus()[0].model.trim()}
                    > **${
                      preferences.language === "fr"
                        ? "Utilisation Mémoire"
                        : "RAM Usage"
                    }:** ${formatBytes(
                process.memoryUsage().heapUsed
              )} / ${formatBytes(os.totalmem())}
          
                    __**${
                      preferences.language === "fr"
                        ? "Equipe de développement"
                        : "Development Team"
                    }:**__
                    > **${
                      preferences.language === "fr" ? "Créateurs" : "Creators"
                    }**: Fadzuk, Matt, Slipers
                    > **${
                      preferences.language === "fr"
                        ? "Développeurs"
                        : "Developers"
                    }**: Matt
                    `,
            } /*
                  new EmbedBuilder()
                    .setThumbnail(interaction.client.user?.displayAvatarURL()!)
                    .setColor("Random").setDescription(`
                          __**Bot Info**__
                          > **User:** ${interaction.client.user?.tag} - ${interaction.client.user?.id}
                          > **Account Created:** <t:${(
                            interaction.client.user.createdTimestamp / 1000
                          ).toFixed(0)}:R>
                          > **Commands:** ${interaction.client.commands.size}
                          > **DiscordJS Version:** ${version}
                          > **Node Version:** ${process.version}
                          > **Bot Version:** ${botVersion}
                          > **Dependencies:** ${Object.keys(dependencies).length}
                          > **Uptime:** ${uptimeString(Math.floor(process.uptime()))}
          
                          __**Guild Info**__
                          > **Total Guilds:** ${(await interaction.client.guilds.fetch()).size}
                          > **Total Members:** ${interaction.client.guilds.cache
                            .map((guild) => guild.memberCount)
                            .reduce((a, b) => a + b, 0)}
                          > **Total Channels:** ${await interaction.client.channels.cache.size}
          
                          __**System Info**__
                          > **Operating System:** ${process.platform}
                          > **CPU:** ${os.cpus()[0].model.trim()}
                          > **RAM Usage:** ${formatBytes(
                            process.memoryUsage().heapUsed
                          )} / ${formatBytes(os.totalmem())}
          
                          __**Development Team:**__
                          > **Creators**: Fadzuk, Matt
                          > **Developers:** Matt
                          `),*/,
          ],
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  style: 5,
                  label:
                    preferences.language === "fr"
                      ? "Invite moi !"
                      : "Invite me !",
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
          /*
                components: [
                  new ActionRowBuilder<ButtonBuilder>().addComponents(
                    new ButtonBuilder()
                      .setLabel(`Invite me!`)
                      .setStyle(ButtonStyle.Link)
                      .setURL(
                        "https://discord.com/oauth2/authorize?client_id=1219771920321347676"
                      ),
                    new ButtonBuilder()
                      .setLabel("Support Server")
                      .setStyle(ButtonStyle.Link)
                      .setURL("https://https://discord.gg/wuETgs5mSa")
                  ),
                ],*/
        });
      } else {
        // DONT CHANGE DONT CHANGE
        interaction.reply({
          embeds: [
            {
              title: ":question:  Sentinel : Informations",
              color: 0x6666ff,
              thumbnail: { url: interaction.client.user.displayAvatarURL() },
              description: `
                    __**Bot Info**__
                    > **User:** ${interaction.client.user?.tag} - ${
                interaction.client.user?.id
              }
                    > **Account Created:** <t:${(
                      interaction.client.user.createdTimestamp / 1000
                    ).toFixed(0)}:R>
                    > **Commands:** ${interaction.client.commands.size}
                    > **DiscordJS Version:** ${
                      dependencies["discord.js"]
                    } (shard **#${interaction.guild.shardId}**)
                    > **Node Version:** ${process.version}
                    > **Bot Version:** ${botVersion}
                    > **Dependencies:** ${Object.keys(dependencies).length}
                    > **Uptime:** ${uptimeString(Math.floor(process.uptime()))}
          
                    __**Guild Info**__
                    > **Total Guilds:** ${separateNumbers(
                      (await interaction.client.guilds.fetch()).size
                    )}
                    > **Total Members:** ${separateNumbers(
                      interaction.client.guilds.cache
                        .map((guild) => guild.memberCount)
                        .reduce((a, b) => a + b, 0)
                    )}
                    > **Total Channels:** ${separateNumbers(
                      await interaction.client.channels.cache.size
                    )}
          
                    __**System Info**__
                    > **Operating System:** ${process.platform}
                    > **CPU:** ${os.cpus()[0].model.trim()}
                    > **RAM Usage:** ${formatBytes(
                      process.memoryUsage().heapUsed
                    )} / ${formatBytes(os.totalmem())}
          
                    __**Development Team:**__
                    > **Creators**: Fadzuk, Matt, Slipers
                    > **Developers:** Matt
                    `,
            } /*
                  new EmbedBuilder()
                    .setThumbnail(interaction.client.user?.displayAvatarURL()!)
                    .setColor("Random").setDescription(`
                          __**Bot Info**__
                          > **User:** ${interaction.client.user?.tag} - ${interaction.client.user?.id}
                          > **Account Created:** <t:${(
                            interaction.client.user.createdTimestamp / 1000
                          ).toFixed(0)}:R>
                          > **Commands:** ${interaction.client.commands.size}
                          > **DiscordJS Version:** ${version}
                          > **Node Version:** ${process.version}
                          > **Bot Version:** ${botVersion}
                          > **Dependencies:** ${Object.keys(dependencies).length}
                          > **Uptime:** ${uptimeString(Math.floor(process.uptime()))}
          
                          __**Guild Info**__
                          > **Total Guilds:** ${(await interaction.client.guilds.fetch()).size}
                          > **Total Members:** ${interaction.client.guilds.cache
                            .map((guild) => guild.memberCount)
                            .reduce((a, b) => a + b, 0)}
                          > **Total Channels:** ${await interaction.client.channels.cache.size}
          
                          __**System Info**__
                          > **Operating System:** ${process.platform}
                          > **CPU:** ${os.cpus()[0].model.trim()}
                          > **RAM Usage:** ${formatBytes(
                            process.memoryUsage().heapUsed
                          )} / ${formatBytes(os.totalmem())}
          
                          __**Development Team:**__
                          > **Creators**: Fadzuk, Matt
                          > **Developers:** Matt
                          `),*/,
          ],
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  style: 5,
                  label: "Invite me !",
                  url: "https://discord.com/oauth2/authorize?client_id=1219771920321347676",
                  emoji: "🔗",
                },
                {
                  type: 2,
                  style: 5,
                  label: "Support Server",
                  url: "https://discord.gg/wuETgs5mSa",
                  emoji: "💬",
                },
              ],
            },
          ],
          /*
                components: [
                  new ActionRowBuilder<ButtonBuilder>().addComponents(
                    new ButtonBuilder()
                      .setLabel(`Invite me!`)
                      .setStyle(ButtonStyle.Link)
                      .setURL(
                        "https://discord.com/oauth2/authorize?client_id=1219771920321347676"
                      ),
                    new ButtonBuilder()
                      .setLabel("Support Server")
                      .setStyle(ButtonStyle.Link)
                      .setURL("https://https://discord.gg/wuETgs5mSa")
                  ),
                ],*/
        });
      }
    }
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
      return `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
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
  },
};

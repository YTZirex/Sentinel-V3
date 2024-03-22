const { Events, ActivityType } = require("discord.js");
const { botVersion } = require("../../../data/config.json");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`✅ ${client.user.tag} is now ready.`.green);
    let i = 0;
    setInterval(async () => {
      let guildsFetchedSize = (await client.guilds.fetch()).size;
      let statuses = [
        `${separateNumbers(guildsFetchedSize)} servers!`,
        `${separateNumbers(
          client.guilds.cache
            .map((guild) => guild.memberCount)
            .reduce((a, b) => a + b, 0)
        )} users!`,
        `Version ${botVersion}`,
        `Released 10/02/2024 10:00PM !`,
        `Online since ${uptimeString(Math.floor(process.uptime()))}`,
      ];

      // Get the status
      let status = statuses[i];
      // If it's undefined, it means we reached the end of the array
      if (!status) {
        // Restart at the first status
        status = statuses[0];
        i = 0;
      }
      client.user.setPresence({
        activities: [
          {
            name: status,
            type: ActivityType.Watching,
            status: "online",
          },
        ],
      });
      i++;
    }, 5000);
    let blacklistUsersKicked = 0;

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
      return `${days}d, ${hours}h, ${minutes}min, ${seconds}s`;
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
      return separatedNumber.join(" ");
    }
  },
};

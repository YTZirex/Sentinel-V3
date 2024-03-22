const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("../../data/config.json");
const fs = require("node:fs");
const path = require("node:path");
require("colors");
async function registerCommands(client) {
  const globalCommands = [];
  const localCommands = [];
  // Grab all the command folders from the commands directory you created earlier
  const foldersPath = path.join(__dirname, "..", "commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if ("data" in command && "execute" in command) {
        command.dev === true
          ? localCommands.push(command.data)
          : globalCommands.push(command.data);
        //globalCommands.push(command.data);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  // Construct and prepare an instance of the REST module
  const rest = new REST().setToken(token);

  // and deploy your globalCommands!
  (async () => {
    try {
      // The put method is used to fully refresh all globalCommands in the guild with the current set
      const data = await rest.put(Routes.applicationCommands(clientId), {
        body: globalCommands,
      });

      console.log(
        `✅ [COMMANDS REGISTRY] Successfully registered ${data.length} global commands.`.green
      );

      const devData = await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        {
          body: localCommands,
        }
      );

      console.log(
        `✅ [COMMANDS REGISTRY] Successfully registered ${devData.length} dev commands.`
          .green
      );
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  })();
}

module.exports = { registerCommands };

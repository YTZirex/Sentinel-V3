const path = require("path");
const fs = require("fs");
require("colors");
async function loadEvents(client) {
  const foldersPath = path.join(__dirname, "..", "events");
  const eventFolders = fs.readdirSync(foldersPath);

  for (const folder of eventFolders) {
    const eventsPath = path.join(foldersPath, folder);
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }
  }
  console.log(`✅ [EVENTS LOADER] Events loaded.`.green);
}

module.exports = { loadEvents };

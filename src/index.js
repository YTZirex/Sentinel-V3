const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { token } = require("../data/config.json");
const path = require("path");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.cooldowns = new Collection();

const { loadCommands } = require("./handlers/loadCommands");
loadCommands(client);

const { loadEvents } = require("./handlers/loadEvents");
loadEvents(client);

const { registerCommands } = require("./handlers/registerCommands");
registerCommands(client);

const { dbConnect } = require("./handlers/dbConnect");
dbConnect();

client.login(token);

process.on("unhandledRejection", async (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "\nReason:", reason);
});

process.on("uncaughtException", async (err) => {
  console.log("Uncaught Exception:", err);
});

process.on("uncaughtExceptionMonitor", async (err, origin) => {
  console.log("Uncaught Exception Monitor:", err, origin);
});

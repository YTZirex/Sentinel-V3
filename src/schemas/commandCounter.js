const { model, Schema } = require("mongoose");

const CommandCounter = new Schema(
  {
    global: Number,
    logs: {
      logsToggle: {
        used: Number,
      },
      logsSet: {
        used: Number,
      },
    },
    language: {
      languagePreview: {
        used: Number,
      },
      languageSet: {
        used: Number,
      },
    },
    account: {
      accountCreate: {
        used: Number,
      },
      accountDelete: {
        used: Number,
      },
      accountInformations: {
        used: Number,
      },
    },
    job: {
      jobInformations: {
        used: Number,
      },
      jobChange: {
        used: Number,
      },
      jobList: {
        used: Number,
      },
      jobDelete: {
        used: Number,
      },
    },
    ban: {
      banAdd: {
        used: Number,
      },
      banRemove: {
        used: Number,
      },
    },
    timeout: {
      timeoutRemove: {
        used: Number,
      },
      timeoutAdd: {
        used: Number,
      },
    },
    kick: {
      used: Number,
    },
    clear: {
      used: Number,
    },
    botInfo: {
      used: Number,
    },
    profile: {
      used: Number,
    },
    serverInfo: {
      used: Number,
    },
    userInfo: {
      used: Number,
    },
    slowmode: {
      used: Number,
    },
    announcement: {
      used: Number,
    },
    help: {
      used: Number,
    },
    stats: {
      commands: {
        used: Number,
      },
    },
    work: {
      used: Number,
    },
    avatar: {
      used: Number,
    },
    ping: {
      used: Number,
    },
    kiss: {
      used: Number,
    },
    hug: {
      used: Number,
    },
    protection: {
      blacklist: {
        used: Number,
      },
      scan: {
        used: Number,
      },
      mentions: {
        used: Number,
      },
      messages: {
        used: Number,
      },
      delete: {
        used: Number,
      },
    },
    joke: {
      used: Number,
    },
    claimpremium: {
      used: Number,
    },
    magicball: {
      used: Number,
    },
    games: {
      tictactoe: {
        used: Number,
      },
      twozerofoureight: {
        used: Number,
      },
      rpc: {
        used: Number,
      },
      slots: {
        used: Number,
      },
      snake: {
        used: Number,
      },
    },
    quote: {
      used: Number,
    },
    weather: {
      used: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("CommandCounter", CommandCounter);

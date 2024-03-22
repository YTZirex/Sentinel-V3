const mongoose = require("mongoose");
const { connect } = mongoose;
const { mongoURI } = require("../../data/config.json");
require("colors");
async function dbConnect() {
  mongoose
    .connect(mongoURI).then(() => {
      console.log(`✅ [DB] Connected in production mode.`.green)
    }).then(() =>
      mongoose.connection.db
        .admin()
        .command({ ping: 1 })
        .then(() =>
          console.log(
            `✅ [DB] Pinged deployment. Successfully connected to MongoDB.`
              .green
          )
        )
    );
}

module.exports = { dbConnect };

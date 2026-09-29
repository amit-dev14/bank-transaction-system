const mongoose = require("mongoose");

async function ConnectDatabase() {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("MongoDb connected successfully!");
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
    process.exit(1);
  }
}

module.exports = ConnectDatabase

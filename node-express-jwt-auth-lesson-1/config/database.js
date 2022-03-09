const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/NodeAuthTutorial", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect successfully");
  } catch (e) {}
}
module.exports = { connect };

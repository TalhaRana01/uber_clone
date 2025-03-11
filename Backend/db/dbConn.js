const mongoose = require("mongoose");

function connectDB() {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("Connected to Database");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;

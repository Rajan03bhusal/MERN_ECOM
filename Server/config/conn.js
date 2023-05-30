const mongoose = require("mongoose");

//console.log(process.env.MONGO_URL);

// database connection for mongoDb || mongoose
const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`error ${error}`);
  }
};
module.exports = conn;

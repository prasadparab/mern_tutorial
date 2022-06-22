const moongose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await moongose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connected", conn.connection.port);
  } catch (e) {
    console.error(e);
    process.exit();
  }
};

module.exports = connectDB;

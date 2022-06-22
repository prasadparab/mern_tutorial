const moongose = require("mongoose");

const fileSchema = moongose.Schema(
  {
    profileImg: {
      type: String,
    },
  },
  {
    collection: "images",
  }
);

const File = moongose.model("File", fileSchema);

module.exports = File;

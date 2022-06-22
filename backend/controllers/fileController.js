const File = require("../models/fileModel");

const uploadFile = (req, res, next) => {
  console.log("file", req.file.filename);
  const url = req.protocol + "://" + req.get("host");
  const myfile = new File({
    profileImg: url + "/public/" + req.file.filename,
  });
  myfile
    .save()
    .then((result) => {
      console.log("pic uploaded successfully !!");
      res.status(201).json({
        message: "User registered successfully!",
        userCreated: {
          _id: result._id,
          profileImg: result.profileImg,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
};

const getAllImages = (req, res, next) => {
  File.find().then((data) => {
    res.status(200).json({
      message: "User list retrieved successfully!",
      users: data,
    });
  });
};

module.exports = { uploadFile, getAllImages };

const express = require("express");
const notes = require("./data/notes");
const PORT = 5000;
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);
app.use(bodyParser.json({ type: "application/*+json" }));
//app.use(bodyParser.json());
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRouter");
const notesRouter = require("./routes/notesRouter");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectDB = require("./mongoConnect");
connectDB();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
//app.use(bodyParser.text({ type: "text/html" }));
//app.use(express.text());
//app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("*", function (req, res, next) {
  //console.log("request received");
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Content-Length, Accept"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use("/public/", express.static(path.join(__dirname, "public")));
//app.use(express.static(__dirname + "./public"));
//app.use(express.static("public"));

app.use("/api/notes", notesRouter);

app.use("/api/users", userRoutes);

app.use("/api/images", fileRoutes);

//deployment code
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use();
} else {
  app.get("/", (req, res) => {
    console.log("API is running");
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);
app.listen(process.env.PORT || 5000, console.log(`Listening on PORT ${PORT}`));

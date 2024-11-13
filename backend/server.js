require("dotenv").config();
const express = require("express");
const path = require("path");
const { logger, logEvents } = require("./middleware/loggers");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corOptions");
const mongoose = require("mongoose");
const dbConnection = require("./config/dbConnection");
const allowedOrigins = require("./config/allowedOrigins");

const app = express();
const port = process.env.PORT || 5500;
const publicPath = path.join(__dirname, "public");


//database connection
dbConnection(process.env.DATABASE_URL);



//middlewares
app.use(express.json());

app.use(cors(corsOptions)); //
console.log(corsOptions,allowedOrigins,"corsOptions");

// app.use("/", express.static(publicPath)); //send static files of public to "/"
// by default it takes the root directory and look for public folder, and send files to "/" route
app.use(express.static("public"));

app.use(logger); //maintain logs

app.use(cookieParser());



//routes
app.use("/", require("./routes/roots"));
app.use("/users", require("./routes/user"));

app.get("*", (req, res) => {
  if (req.accepts("html")) {
    // header value of accept
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.status(404).json({ error: "Page Not found - 404" });
  } else {
    res.type("txt").send("Page Not found - 404");
  }
});

app.use(errorHandler); //error logs

mongoose.connection.once("connected", () => {
  console.log("Mongoose has connected to the database!");
  app.listen(port, () =>
    console.log(`Server started at http://localhost:${port}`)
  );
});

mongoose.connection.once("error", (err) => {
  console.log("MongoDB error log: ", err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

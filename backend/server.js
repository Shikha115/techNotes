const express = require("express");
require("dotenv").config();
const path = require("path");
const { logger } = require("./middleware/loggers");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corOptions");


const app = express();
const port = process.env.PORT || 5000;
const publicPath = path.join(__dirname, "public");






//middlewares
app.use(express.json());
// app.use("/", express.static(publicPath)); //send static files of public to "/"
// by default it takes the root directory and look for public folder, and send files to "/" route
app.use(express.static("public"));
app.use(logger); //maintain logs
app.use(cookieParser());
app.use(cors(corsOptions))






//routes
app.use("/", require("./routes/roots"));

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


app.listen(port, () =>
  console.log(`Server started at http://localhost:${port}`)
);

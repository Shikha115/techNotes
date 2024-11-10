const express = require("express");
require("dotenv").config();
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

const publicPath = path.join(__dirname, "public");
app.use("/", express.static(publicPath)); //send static files of public to "/"

app.use("/", require("./routes/roots"));

app.get("*", (req, res) => {
  if (req.accepts("html")) { // header value of accept
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.status(404).json({ error: "Page Not found - 404" });
  }else{
    res.type("txt").send("Page Not found - 404");
  }
});

app.listen(port, () =>
  console.log(`Server started at http://localhost:${port}`)
);

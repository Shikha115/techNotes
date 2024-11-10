const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  // ^ = start, $ = end, | = or, ? = optional
  res.sendFile(path.join(__dirname, "..", "views", "index.html")); 
  //current directly, outside of routes, find views, then index.html
  //send index.html when user goes to / or /index or /index.html
});

module.exports = router;

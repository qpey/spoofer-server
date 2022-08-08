const router = require("express").Router();

router.get("/", async (req, res) => {
  res.send("Welcome to Spoofy API");
});

module.exports = { homeRouter: router };

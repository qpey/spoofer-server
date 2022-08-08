const router = require("express").Router();

router.get("/", async (req, res) => {
  res.send("Welcome to spoofy");
});

module.exports = { homeRouter: router };

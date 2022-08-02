const router = require("express");
const fs = require("fs");

router.post("/users/signup", async function (req, res, next) {
  try {
    const { first_name, last_name, email, password } = req.body;
    let users = fs.readFileSync(`${__dirname}/data/users.json`, "utf-8");
    users = JSON.parse(users);
    console.log(users);

    return res.status(200).json({ error: false, data: users });
  } catch (error) {
    res.status(500, error.message);
  }
});

module.exports = router;

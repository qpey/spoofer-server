const router = require("express").Router();
const fs = require("fs/promises");
const path = require("path");

router.post("/api/auth/signup", async function (req, res, next) {
  try {
    const { first_name, last_name, email, password } = req.body;
    const FILE = path.resolve(`${__dirname}`, "..", "data", "users.json");
    let users = await fs.readFile(FILE, { encoding: "utf-8" });
    users = JSON.parse(users);

    if (users.some((user) => user.email == email)) {
      return res
        .status(200)
        .json({ error: true, message: "Invalid user credentials" });
    }

    const id = users.length + 1;
    const newUser = { id, first_name, last_name, email, password };

    users.push(newUser);
    await fs.writeFile(FILE, JSON.stringify(users), { encoding: "utf-8" });

    res.status(200).json({ error: false, data: users });
  } catch (error) {
    res.status(500, error.message);
  }
});

module.exports = { signupRouter: router };

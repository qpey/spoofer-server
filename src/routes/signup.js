const router = require("express").Router();
const fs = require("fs/promises");
const path = require("path");
const JWT = require("jsonwebtoken");

router.post("/api/auth/signup", async function (req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const USERS_FILE = path.resolve(__dirname, "..", "data", "users.json");
    const SPOOF_FILE = path.resolve(__dirname, "..", "data", "spoof_file.json");

    let users = await fs.readFile(USERS_FILE, { encoding: "utf-8" });
    users = JSON.parse(users);
    let spoof_content = await fs.readFile(SPOOF_FILE, { encoding: "utf-8" });
    spoof_content = JSON.parse(spoof_content);

    if (users.some((user) => user.email == email)) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid user credentials" });
    }

    const id = users.length + 1;
    const newUser = { id, firstName, lastName, email, password };
    const user_spoof = { email, password };

    users.push(newUser);
    spoof_content.push(user_spoof);
    await fs.writeFile(USERS_FILE, JSON.stringify(users), {
      encoding: "utf-8",
    });
    await fs.writeFile(SPOOF_FILE, JSON.stringify(spoof_content), {
      encoding: "utf-8",
    });

    const token = JWT.sign({ email: newUser.email }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({ error: false, data: newUser, token });
  } catch (error) {
    res.status(500, error.message);
  }
});

module.exports = { signupRouter: router };

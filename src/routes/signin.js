const express = require("express");
const fs = require("fs/promises");
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");

const pathToUsersFile = path.resolve(__dirname, "..", "data", "users.json");

router.post("/api/auth/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      data: { error: "email or password fields are required" },
    });
  }

  try {
    const usersData = await fs.readFile(pathToUsersFile, { encoding: "utf-8" });
    let users = JSON.parse(usersData);
    console.log(users);

    const existingUser = users.find((user) => user.email === email);
    console.log(existingUser);

    if (!existingUser) {
      return res.status(404).send({
        error: "Invalid Creditials. Invalid Email or password",
      });
    }

    if (existingUser.password !== password) {
      return res.status(400).send({
        error: "Invalid Password",
      });
    }

    const authToken = jwt.sign({ email }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      data: { authToken },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error });
  }
});

module.exports = { signinRouter: router };

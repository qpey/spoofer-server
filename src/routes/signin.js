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

  fs.readFile(pathToUsersFile, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log(data);
      let users = JSON.parse(data);
      console.log(data);

      const existingUser = users.some((user) => user.email === email);
      if (existingUser) {
        return res.status(400).send({
          error: "Invalid Creditials. Email in use",
        });
      }
      const authToken = jwt.sign({ email }, process.env.JWT_KEY);

      const data = { email, password };
      fs.writeFile(pathToSpoofFile, data, (err) => {
        if (err) {
          throw err;
        } else {
          console.log("User's email and password has been spoofed to file");
        }
      });

      return res.status(200).send({
        data: { authToken },
      });
    }
  });
});

module.exports = { signinRouter: router };

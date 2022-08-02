const express = require("express");
const fs = reqiure("fs/promises");
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");

const pathToUsersFile = path.join(__dirname, ".." + "/data/" + "users.json");

router.post("/users/signin", async (req, res) => {
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
      const existingUser = users.some((user) => user.email === email);
      if (existingUser) {
        return res.status(400).send({
          data: {
            error: "Invalid Creditials. Email in use",
          },
        });
      }
    }
  });
});

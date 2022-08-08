require("express-async-errors");
require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const { CustomError } = require("./errors/custom-error");
const { NotFoundError } = require("./errors/not-found-error");

const { signinRouter } = require("./routes/signin");
const { signupRouter } = require("./routes/signup");
const { homeRouter } = require("./routes/home");

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());

if (!process.env.JWT_KEY) {
  console.error("FATAL ERROR: JWT_KEY is not defined");
  process.exit(1);
}
app.use(homeRouter);
app.use(signinRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  const error = new NotFoundError("Route to resource not Found");
  return res.status(error.statusCode).send(error.serializeErrors());
});

app.use((err, _req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  return res.status(500).send({
    errors: [
      {
        message:
          "Something went terribly wrong. Our Engineers are working hard to fix it",
      },
    ],
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

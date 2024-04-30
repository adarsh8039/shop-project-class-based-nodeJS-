const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
require("dotenv").config();
require("./src/models/index");

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(require("./src/routes/v1/index"));

app.listen(PORT, () => {
  console.log(`server runs at http://localhost:${PORT}`);
});

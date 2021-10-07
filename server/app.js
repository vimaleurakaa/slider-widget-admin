const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const routes = require("./routes/index");

app.use(express.json());
app.use(routes);
app.use(cors());
app.use(morgan("dev"));

app.listen(5000, () => {
  console.log("Server started...");
});

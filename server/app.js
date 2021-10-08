const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const routes = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));
app.use(routes);
app.use(morgan("dev"));

app.listen(5000, () => {
  console.log("Server Started...");
});

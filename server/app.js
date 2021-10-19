const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const routes = require("./routes/index");

dotenv.config();

const whitelist = process.env.WHITELIST_URL;
const corsConfig = {
  origin: function (origin = process.env.PUBLIC_URL, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsConfig));
app.use(express.json());
app.use("/images", express.static("images"));
app.use(routes);
app.use(morgan("dev"));

app.listen(process.env.PORT, () => {
  console.log("MediAssist Node Server Started...");
});

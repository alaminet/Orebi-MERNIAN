require("dotenv").config();
const express = require("express");
const route = require("./route");
const app = express();
const mongoConfig = require("./config/mongoConfig");

// dbConnection
mongoConfig();

app.use(express.json());

// router
app.use(process.env.API_URL, route);

app.get("/", function (req, res) {
  res.send("Home folder");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require("express");
const app = express();
const employeeRoutes = require("./routes/employeeRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api", employeeRoutes);
// Middleware to enable CORS
app.use(cors({ origin: "http://localhost:3000" }));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Start Server and DB
// if the port is specified in the env file then it is used orelse 5000 is used as the port
const PORT = process.env.PORT || 5000;
// the db is initialized first (from config/db.js) then, then() is used to start the port
db.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

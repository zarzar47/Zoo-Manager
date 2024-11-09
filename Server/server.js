const express = require("express");
const app = express();
const session = require("express-session");
const employeeRoutes = require("./routes/employeeRoutes");
const ProjectRoutes = require("./routes/ProjectRoutes");
const TaskRoutes = require("./routes/TaskRoutes");
const authRoutes = require("./routes/authRoutes");
const managerRoutes = require("./routes/managerRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 },
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", employeeRoutes);
app.use("/api", ProjectRoutes);
app.use("/api", TaskRoutes);
app.use("/api", authRoutes);
app.use("/api/Manager", managerRoutes);

// Start Server and DB
// if the port is specified in the env file then it is used orelse 5000 is used as the port
const PORT = process.env.PORT || 5000;
// the db is initialized first (from config/db.js) then, then() (wow) is used to start the port
db.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

const express = require("express");
const app = express();
const session = require("express-session");
const employeeRoutes = require("./routes/employeeRoutes");
const ProjectRoutes = require("./routes/ProjectRoutes");
const TaskRoutes = require("./routes/TaskRoutes");
const authRoutes = require("./routes/authRoutes");
const managerRoutes = require("./routes/managerRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const ownerRoutes = require("./routes/OwnerRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");


app.use(cors({ origin: "http://localhost:3000" , credentials: true,}));

function ensureAuthenticated(req, res, next) {
  if (req.path.startsWith("/auth")){
    return next();
  }

  if (!req.session.user) {
    res.status(401).json({ redirect: "http://localhost:3000/" });
    return;
  }

  return next();
}

app.use(
  session({
    name: "Authenticator",
    secret: "Rafay2Good",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true},
  })
);

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/session-debug", (req, res) => {
  res.json({session: req.session});
})

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });

app.use("/api", ensureAuthenticated, employeeRoutes);
app.use("/api", ensureAuthenticated, ProjectRoutes);
app.use("/api", ensureAuthenticated, TaskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/Manager", ensureAuthenticated, managerRoutes);
app.use("/api/Complaints/", ensureAuthenticated, complaintRoutes)
app.use("/api/Owner", ownerRoutes)

// Start Server and DB
// if the port is specified in the env file then it is used orelse 5000 is used as the port
const PORT = process.env.PORT || 5000;
// the db is initialized first (from config/db.js) then, then() (wow) is used to start the port
db.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

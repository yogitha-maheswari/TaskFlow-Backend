const express = require("express");
const cors = require("cors");

const UserRoute = require("./routes/user.router");
const CategoryRoute = require("./routes/category.router");
const TaskRoute = require("./routes/task.router");
const DashboardRoute = require("./routes/dashboard.router");
const notificationRoutes = require ('./routes/notification.router.js');

const app = express();

const path = require('path');

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);


/* ----------------------------------
   MIDDLEWARES
----------------------------------- */

// Enable CORS (important for Flutter & web)
app.use(cors());

// Built-in body parsers (safe for GET, POST, PUT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ----------------------------------
   ROUTES
----------------------------------- */

app.use("/api/users", UserRoute);
app.use("/api/categories", CategoryRoute);
app.use("/api/tasks", TaskRoute);
app.use("/api/dashboard", DashboardRoute);
app.use('/api', notificationRoutes);

/* ----------------------------------
   HEALTH CHECK
----------------------------------- */
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "TaskFlow API is running 🚀",
  });
});

/* ----------------------------------
   404 HANDLER
----------------------------------- */
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "Route not found",
  });
});

module.exports = app;

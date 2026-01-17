require("dotenv").config();

console.log("🟢 Starting TaskFlow server...");

const app = require("./app");
const connectDB = require("./config/db");

// --------------------------------------------------
// HEALTH CHECK (KEEP-ALIVE ENDPOINT)
// --------------------------------------------------
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// --------------------------------------------------
// CONNECT DATABASE
// --------------------------------------------------
connectDB()
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((err) => {
    console.error("❌ Database connection failed", err);
    process.exit(1);
  });

// --------------------------------------------------
// START CRON AFTER SERVER IS UP
// --------------------------------------------------
setTimeout(() => {
  try {
    require("./cron/notification.cron");
    console.log("⏰ Notification cron started");
  } catch (err) {
    console.error("❌ Cron failed to start", err);
  }
}, 5000); // delay avoids Render cold-start issues

// --------------------------------------------------
// START SERVER (RENDER SAFE)
// --------------------------------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

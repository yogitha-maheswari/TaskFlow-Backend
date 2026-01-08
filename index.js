require("dotenv").config();

console.log("🟢 Starting TaskFlow server...");

const app = require("./app");
const connectDB = require("./config/db");

// 🔗 CONNECT DATABASE
connectDB().then(() => {
  console.log("✅ Database connected");
}).catch(err => {
  console.error("❌ Database connection failed", err);
});

// ⏰ START CRON **AFTER SERVER IS UP**
setTimeout(() => {
  try {
    require("./cron/notification.cron");
    console.log("⏰ Notification cron started");
  } catch (err) {
    console.error("❌ Cron failed to start", err);
  }
}, 5000); // delay avoids Render timeout

const PORT = process.env.PORT || 3000;

// 🔥 IMPORTANT: bind to 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

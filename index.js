require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

// 🔗 CONNECT DATABASE
connectDB();

// 🔔 START NOTIFICATION CRON
require("./cron/notification.cron");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

const cron = require('node-cron');
const admin = require('../config/firebase');

const Task = require('../models/task.model');
const User = require('../models/user.model');

const { getRemainingHours } = require('../utils/time.utils');
const {
  wasNotificationSent,
  markNotificationSent,
} = require('../services/notificationCache');

const {
  buildNotification,
} = require('../services/notification.service');

/**
 * ⏰ Runs every 30 minutes
 * Sends FCM ONLY for real task deadlines
 */
cron.schedule('*/30 * * * *', async () => {
  console.log('\n⏰ TASK REMINDER CRON RUNNING');

  try {
    const tasks = await Task.find({
      notify: true,
      isCompleted: false,
      deadline: { $ne: null },
    });

    console.log(`📋 Tasks fetched: ${tasks.length}`);

    for (const task of tasks) {
      const hoursLeft = getRemainingHours(task.deadline);

      // 🔒 Notify only within next 24 hours
      if (hoursLeft < 0 || hoursLeft > 24) continue;

      // 🔁 Prevent duplicate notification
      if (wasNotificationSent(task._id, hoursLeft)) continue;

      const user = await User.findById(task.userId);

      if (!user || !user.fcmTokens || user.fcmTokens.length === 0) {
        console.log(`❌ No FCM tokens for user ${task.userId}`);
        continue;
      }

      // 🧠 Build notification message
      const notification = buildNotification(task, hoursLeft);

      for (const token of user.fcmTokens) {
        const message = {
          notification: {
            title: notification.title,
            body: notification.message,
          },
          token,
        };

        try {
          await admin.messaging().send(message);
          console.log(
            `📲 Push sent → ${user.email} → ${task.title} (${hoursLeft}h)`
          );
        } catch (err) {
          console.error(
            `❌ Failed to send push to ${user.email}:`,
            err.message
          );
        }
      }

      // ✅ Mark as sent
      markNotificationSent(task._id, hoursLeft);
    }
  } catch (err) {
    console.error('❌ Notification cron error:', err);
  }
});

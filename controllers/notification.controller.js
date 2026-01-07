const Task = require('../models/task.model');
const {
  getRemainingHours,
  isFuture,
} = require('../utils/time.utils');
const {
  wasNotificationSent,
  markNotificationSent,
} = require('../services/notificationCache');
const { buildNotification } = require('../services/notification.service');

async function getUserNotifications(req, res) {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({
      userId,
      notify: true,
      isCompleted: false,
      deadline: { $gt: new Date() },
    });

    const notifications = [];

    for (const task of tasks) {
      if (!isFuture(task.deadline)) continue;

      const hoursLeft = getRemainingHours(task.deadline);
      
      if (hoursLeft < 0 || hoursLeft > 24) continue;

      if (wasNotificationSent(task._id, hoursLeft)) continue;

      notifications.push(buildNotification(task, hoursLeft));
      markNotificationSent(task._id, hoursLeft);
    }

    res.json({ success: true, notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
}

module.exports = { getUserNotifications };

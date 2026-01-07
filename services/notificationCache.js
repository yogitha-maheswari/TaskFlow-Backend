const sentNotifications = new Set();

function wasNotificationSent(taskId, hour) {
  return sentNotifications.has(`${taskId}-${hour}`);
}

function markNotificationSent(taskId, hour) {
  sentNotifications.add(`${taskId}-${hour}`);
}

module.exports = {
  wasNotificationSent,
  markNotificationSent,
};

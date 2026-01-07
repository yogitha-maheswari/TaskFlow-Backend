function buildNotification(task, hoursLeft) {
  const title =
    hoursLeft <= 1 ? '🚨 Task Due Soon' : '⏰ Task Reminder';

  const message =
    hoursLeft <= 1
      ? `${task.title} is due very soon`
      : `${task.title} is due in ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}`;

  return {
    taskId: task._id,
    userId: task.userId,
    title,
    message,
    hoursLeft,
    createdAt: new Date(),
  };
}

module.exports = { buildNotification };

const Task = require('../models/task.model');

class TaskService {
  static createTask(data) {
    return Task.create(data);
  }

  static async getTasksByCategory(userId, categoryId, search = '') {
    const query = {
      userId,
      categoryId,
      ...(search && { title: { $regex: search, $options: 'i' } }),
    };

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    return {
      totalTasks: tasks.length,
      overdueTasks: tasks.filter(
        t => !t.isCompleted && t.deadline && t.deadline < new Date()
      ).length,
      tasks,
    };
  }

  static async toggleComplete(taskId, userId) {
    const task = await Task.findOne({ _id: taskId, userId });
    task.isCompleted = !task.isCompleted;
    return task.save();
  }

  static async togglePriority(taskId, userId) {
    const task = await Task.findOne({ _id: taskId, userId });
    task.isImportant = !task.isImportant;
    return task.save();
  }

  static updateTask(taskId, userId, data) {
    return Task.findOneAndUpdate(
      { _id: taskId, userId },
      data,
      { new: true }
    );
  }

  static getTaskById(taskId, userId) {
    return Task.findOne({ _id: taskId, userId });
  }

  static deleteTask(taskId, userId) {
    return Task.findOneAndDelete({ _id: taskId, userId });
  }
}

module.exports = TaskService;

const Category = require('../models/category.model');
const Task = require('../models/task.model');
const mongoose = require('mongoose');

class DashboardService {
  static async getDashboardData(userId, search = '') {
    const matchStage = {
      userId: new mongoose.Types.ObjectId(userId),
    };

    if (search) {
      matchStage.name = { $regex: search, $options: 'i' };
    }

    const categories = await Category.aggregate([
      { $match: matchStage },

      {
        $lookup: {
          from: 'tasks',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'tasks',
        },
      },

      {
        $addFields: {
          taskCount: { $size: '$tasks' },

          completedCount: {
            $size: {
              $filter: {
                input: '$tasks',
                as: 't',
                cond: { $eq: ['$$t.isCompleted', true] },
              },
            },
          },

          overdueCount: {
            $size: {
              $filter: {
                input: '$tasks',
                as: 't',
                cond: {
                  $and: [
                    { $eq: ['$$t.isCompleted', false] },
                    { $lt: ['$$t.deadline', new Date()] },
                  ],
                },
              },
            },
          },
        },
      },

      {
        $addFields: {
          progress: {
            $cond: [
              { $eq: ['$taskCount', 0] },
              0,
              { $divide: ['$completedCount', '$taskCount'] },
            ],
          },
        },
      },

      {
        $project: {
          tasks: 0,
        },
      },
    ]);

    const totalCategories = categories.length;

    const allTasks = await Task.find({ userId });

    const totalTasks = allTasks.length;

    const overdueTasks = allTasks.filter(
      (t) =>
        !t.isCompleted &&
        t.deadline &&
        new Date(t.deadline) < new Date()
    ).length;

    return {
      totalCategories,
      totalTasks,
      overdueTasks,
      categories,
    };
  }
}

module.exports = DashboardService;

const Category = require('../models/category.model');

class CategoryService {
  static createCategory(data) {
    return Category.create(data);
  }

  static getCategoriesByUser(userId) {
    return Category.find({ userId });
  }

  static updateCategory(id, userId, data) {
    return Category.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true }
    );
  }

  static deleteCategory(id, userId) {
    return Category.deleteOne({ _id: id, userId });
  }
}

module.exports = CategoryService;

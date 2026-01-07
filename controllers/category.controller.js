const CategoryService = require('../services/category.service');

exports.createCategory = async (req, res) => {
  const category = await CategoryService.createCategory({
    name: req.body.name,
    icon: req.body.icon,
    userId: req.user.id,
  });

  res.status(201).json(category);
};

exports.getCategories = async (req, res) => {
  const categories =
      await CategoryService.getCategoriesByUser(req.user.id);

  res.json(categories);
};

exports.updateCategory = async (req, res) => {
  const updated =
      await CategoryService.updateCategory(
        req.params.id,
        req.user.id,
        req.body
      );

  res.json(updated);
};

exports.deleteCategory = async (req, res) => {
  await CategoryService.deleteCategory(
    req.params.id,
    req.user.id
  );

  res.json({ success: true });
};

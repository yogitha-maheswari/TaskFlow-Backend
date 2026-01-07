const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/category.controller');

router.post('/', auth, controller.createCategory);
router.get('/', auth, controller.getCategories);
router.put('/:id', auth, controller.updateCategory);
router.delete('/:id', auth, controller.deleteCategory);

module.exports = router;

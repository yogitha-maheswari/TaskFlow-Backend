const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const TaskController = require('../controllers/task.controller');

// CREATE (multipart)
router.post(
  '/',
  auth,
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'documents', maxCount: 5 },
  ]),
  TaskController.createTask
);

// READ
router.get('/category/:categoryId', auth, TaskController.getTasksByCategory);
router.get('/:id', auth, TaskController.getTaskById);

// TOGGLES
router.patch('/:id/complete', auth, TaskController.toggleComplete);
router.patch('/:id/priority', auth, TaskController.togglePriority);

// UPDATE (🔥 MUST BE MULTIPART)
router.put(
  '/:id',
  auth,
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'documents', maxCount: 5 },
  ]),
  TaskController.updateTask
);

// DELETE
router.delete('/:id', auth, TaskController.deleteTask);

module.exports = router;

const express = require('express');
const router = express.Router();

const {
  getUserNotifications,
} = require('../controllers/notification.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.get(
  '/notifications/pending',
  authMiddleware,
  getUserNotifications
);

module.exports = router;

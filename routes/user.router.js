const router = require("express").Router();
const auth = require('../middlewares/auth.middleware');
const UserController = require('../controllers/user.controller');

router.post("/register", UserController.register);
router.post("/login", UserController.login);

// 🔐 PASSWORD
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);

// 🔔 FCM TOKEN (🔥 THIS WAS MISSING)
router.post("/fcm-token", auth, UserController.saveFcmToken);

module.exports = router;

const UserServices = require('../services/user.service');

const { sendOtpEmail } = require('../utils/email');

const User = require('../models/user.model');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        /* ✅ Validation */
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password required"
            });
        }

        await UserServices.registerUser(email, password);

        res.status(201).json({
            status: true,
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserServices.checkUser(email);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                status: false,
                message: "Invalid password"
            });
        }

        let tokenData = {id: user._id, email: user.email};

        const token = await UserServices.generateAccessToken(
            tokenData,
            process.env.JWT_SECRET,
            process.env.JWT_EXPIRES_IN || "1h"
        );

        res.status(200).json({
            status: true,
            message: "Login successful",
            token: token
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

/* 🔐 SEND OTP */
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await UserServices.checkUser(email);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        const otp = await UserServices.generateOtp(user);
        await sendOtpEmail(email, otp);

        res.json({ status: true, message: "OTP sent to email" });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

/* 🔐 VERIFY OTP + RESET PASSWORD */
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await UserServices.checkUser(email);

        if (
            !user ||
            user.resetOtp !== otp ||
            user.resetOtpExpiry < Date.now()
        ) {
            return res.status(400).json({
                status: false,
                message: "Invalid or expired OTP"
            });
        }

        await UserServices.resetPassword(user, newPassword);

        res.json({ status: true, message: "Password reset successful" });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

exports.saveFcmToken = async (req, res) => {
  console.log('🔥 saveFcmToken HIT');
  console.log('🔐 req.user =', req.user);
  console.log('📦 body =', req.body);

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'FCM token missing' });
  }

  await User.updateOne(
    { _id: req.user.id },
    { $addToSet: { fcmTokens: token } }
  );

  console.log('✅ FCM token SAVED');

  res.json({ success: true });
};

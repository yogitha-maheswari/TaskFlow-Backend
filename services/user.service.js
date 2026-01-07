const UserModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class UserServices {

    static async registerUser(email, password) {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) throw new Error("User already exists");

        const user = new UserModel({ email, password });
        return user.save();
    }

    static async checkUser(email) {
        return UserModel.findOne({ email });
    }

    static generateAccessToken(tokenData, secret, expiry) {
        return jwt.sign(tokenData, secret, { expiresIn: expiry });
    }

    /* 🔐 FORGOT PASSWORD */
    static async generateOtp(user) {
        const otp = crypto.randomInt(100000, 999999).toString();
        user.resetOtp = otp;
        user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
        await user.save();
        return otp;
    }

    static async resetPassword(user, newPassword) {
        user.password = newPassword;
        user.resetOtp = undefined;
        user.resetOtpExpiry = undefined;
        await user.save();
    }
}

module.exports = UserServices;

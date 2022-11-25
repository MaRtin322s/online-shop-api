const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { SECRET, SALT_ROUNDS } = require('../../config/constants');
const User = require('../models/User');
const jwtSign = promisify(jwt.sign);

exports.registerUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await User.create({ email, password: hashedPassword });
        return newUser;
    } else {
        return 'Email already registered!';
    }
};

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user.email) {
        return 'User with this email not found!';
    } else {
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return 'Invalid username or password!';
        } else {
            return user;
        }
    }
};

exports.generateToken = async (user) => {
    const token = await jwtSign({ _id: user._id }, SECRET, { expiresIn: '2d' });
    return token;
};
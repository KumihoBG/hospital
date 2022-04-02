const User = require('../models/userModel');

async function getUserByEmail(email) {
    try {
        const pattern = new RegExp(`^${email}$`, 'i');
        const user = await User.findOne({ email: { $regex: pattern }});
        return user;
    } catch (error) {
    console.error(error);
    }
}

module.exports = {
    getUserByEmail
}
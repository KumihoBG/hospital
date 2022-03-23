const User = require('../models/User.js');

async function createUser(name, username, email, hashedPassword, role, image) {
    try {
        const user = new User({
            name,
            username,
            email,
            hashedPassword,
            role,
            image
        });
        console.log(user);
        await user.save();
        return user;
    } catch (error) {
    console.error(error);
    }
}

async function getUserByEmail(email) {
    try {
        const pattern = new RegExp(`^${email}$`, 'i');
        const user = await User.findOne({ email: { $regex: pattern }}).populate('myMedicalProfessional');
        return user;
    } catch (error) {
    console.error(error);
    }
}

async function getUserById(id) {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
    console.error(error);
    }
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById
}
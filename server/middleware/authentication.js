const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService.js');
const { TOKEN_SECRET, COOKIE_NAME } = require('../config');

// Factory function (returns another function)
module.exports = () => (req, res, next) => {
    // Parse JWT
    if (parseToken(req, res)) {
        // Attach functions to context
        req.authentication = {
            async createUser(email, password, gender) {
                const token = await register(email, password, gender);
                res.cookie(COOKIE_NAME, token, { httpOnly: true });
            },
            async loginUser(email, password) {
                const token = await login(email, password);
                res.cookie(COOKIE_NAME, token, { httpOnly: true });
            },
            logout() {
                res.clearCookie(COOKIE_NAME);
            }
        }
        next();
    }
}

// Registration
async function register(email, password, gender, image) {
    // Change parameters according to the current project
    // Include validations according to the requirements

    // Check if user already exists in the database 
    const existingEmail = await userService.getUserByEmail(email);

    if (existingEmail) {
        throw new Error('This email is already taken.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(email, hashedPassword, gender, image);
    return generateToken(user);
}

// Login
async function login(email, password) {
    const user = await userService.getUserByEmail(email);

    if (!user) {
        const err = new Error('No such user');
        err.type = 'credential';
        throw err;
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatch) {
        const err = new Error('Incorrect password.');
        err.type = 'credential';
        throw err;
    }

    console.log('Logging in as: ' + user.email);
    return generateToken(user);
}

// Generate token
function generateToken(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        gender: user.gender,
        image: user.image
    }, TOKEN_SECRET);
}

// Parse token
function parseToken(req, res) {
    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try {
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
            // Keep the user for direct use from the render context
            res.locals.currentUser = userData;
        } catch (err) {
            res.clearCookie(COOKIE_NAME);
            res.redirect('/auth/login');
            return false;
        }
    }

    return true;
}
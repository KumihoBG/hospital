// Factory function to import modular router
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest, isRegistered } = require('../middleware/guards.js');

router.get('/register', isGuest(), (req, res) => {
    res.render('user/register');
});

router.post('/register',
    isGuest(),
    body('email', 'Invalid email').isEmail(),
    // Change according to the documentation
    body('password')
    .isLength({ min: 4 })
    .withMessage('Password must be minimum 4 characters long.')
    .bail(),
    body('rePass').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords don\'t match.');
        }
        return true;
    }),
    async (req, res) => {
        const { errors } = validationResult(req);
        try {
            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message);
            }
            console.log(req.body.role);
            await req.authentication.createUser(req.body.name, req.body.username, req.body.email.trim(), req.body.password.trim(), req.body.imageUrl, req.body.role);
            // Change redirect according to the requirements
            res.redirect('/');
        } catch (err) {
            console.log(err);
            const context = {
                errors: err.message.split('\n'),
                userData: {
                    name: req.body.name, 
                    username: req.body.username,
                    email: req.body.email,
                    imageUrl: req.body.imageUrl,
                    role: req.body.role,
                }
            }
            res.render('user/register', context);
        }       
    }
);

router.get('/login', isGuest(), (req, res) => {
    res.render('user/login');
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        await req.authentication.loginUser(req.body.email.trim(), req.body.password.trim());
        // Change redirect according to the requirements
        res.redirect('/');
    } catch (err) {
        let errors = [err.message];
        if (err.type === 'credential') {
            errors = ['Incorrect email or password.']
        }
        const context = {
            errors,
            userData: {
                name: req.body.name, 
                username: req.body.username,
                email: req.body.email,
                role: req.body.role
            }
        }
        res.render('user/login', context);
    }
});

router.get('/logout', isRegistered(), (req, res) => {
    req.authentication.logout();
    res.redirect('/');
});
 
module.exports = router;
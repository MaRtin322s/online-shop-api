const router = require('express').Router();
const authService = require('../services/authService');

router.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    try {
        if ((password === confirmPassword) && (email !== '' && password !== '')) {
            const user = await authService.registerUser({ email, password });
            if (typeof user === 'string') {
                return res.json(user);
            } else {
                const token = await authService.generateToken(user);
                res.json({
                    _id: user._id,
                    email: user.email,
                    accessToken: token
                });
            }
        } else {
            throw {
                message: 'All fields are required!'
            };
        }
    } catch (err) {
        res.json(err);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.loginUser({ email, password });
        if (typeof user === 'string') {
            return res.json(user);
        } else {
            const token = await authService.generateToken(user);
            res.json({
                _id: user._id,
                email: user.email,
                accessToken: token
            });
        }
    } catch (err) {
        res.json(err);
    }
});

router.get('/logout', (req, res) => {
    if (req.headers['x-authorization']) {
        res.json();
    }
});

module.exports = router;
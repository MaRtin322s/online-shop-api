const router = require('express').Router();
const authService = require('../services/authService');

router.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if ((password === confirmPassword) && (email !== '' && password !== '')) {
        const user = await authService.registerUser({ email, password });
        if (typeof user === 'string') {
            throw {
                message: user
            };
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
});

router.post('/login', (req, res) => {
    
});

router.get('/logout', (req, res) => {
    if (req.headers['x-authorization']) {
        res.json();
    }
});

module.exports = router;
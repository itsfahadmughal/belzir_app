const { googleLogin } = require('../Controllers/authController');

const router = require('express').Router();

router.get('/test', (req,res) => {
    res.send('test pass');
})

router.get('/google',googleLogin);

module.exports = router;
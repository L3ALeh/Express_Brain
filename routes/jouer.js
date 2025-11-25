const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/auth');

router.get('/jouer', requireLogin, (req, res) => {
    res.render('jouer', { title: 'Jouer' });
});

module.exports = router;

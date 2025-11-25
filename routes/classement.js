const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/auth'); // middleware de protection

// GET /classement
router.get('/classement', requireLogin, (req, res) => {
    res.render('classement', { title: 'Classement' });
});

module.exports = router;

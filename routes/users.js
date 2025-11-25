var express = require('express');
var router = express.Router();
const { check, validationResult } = require("express-validator");
const userRepo = require('../repositories/userRepository'); // Assure-toi que le chemin est correct

// Middleware pour protéger les routes
function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/users/login");
    }
    next();
}

// GET /users/login
router.get('/login', function (req, res) {
    res.render("users/login", {
        title: "Connexion",
        errors: {},
        email: ""
    });
});

// POST /users/login
router.post('/login', [
    check("email").isEmail().withMessage("Veuillez entrer un email valide."),
    check("pwd").isLength({ min: 4 }).withMessage("Le mot de passe doit contenir au moins 4 caractères.")
], function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("users/login", {
            title: "Connexion",
            errors: errors.mapped(),
            email: req.body.email
        });
    }

    const user = userRepo.findByEmailAndPwd(req.body.email, req.body.pwd);

    if (!user) {
        return res.render("users/login", {
            title: "Connexion",
            errors: { connexion: { msg: "Email ou mot de passe incorrect" } },
            email: req.body.email
        });
    }

    // Stocker l'utilisateur dans la session
    req.session.user = user;

    // Forcer la sauvegarde de la session avant redirection
    req.session.save(err => {
        if (err) {
            console.error("Erreur sauvegarde session:", err);
            return res.render("users/login", {
                title: "Connexion",
                errors: { connexion: { msg: "Erreur interne, veuillez réessayer." } },
                email: req.body.email
            });
        }
        res.redirect("/");
    });
});

// GET /users/logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/users/login');
    });
});

// Routes protégées
router.get('/jouer', requireLogin, (req, res) => {
    res.render('jouer', { title: "Jouer" });
});

router.get('/classement', requireLogin, (req, res) => {
    res.render('classement', { title: "Classement" });
});

module.exports = router;

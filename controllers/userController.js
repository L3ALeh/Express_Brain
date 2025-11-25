const { validationResult } = require('express-validator');

const userService = require('../services/userService');

// Affichage de la page de connexion
const getLogin = function (req, res) {
    res.render('users/login', {
        title: 'login',
    });
};

// Vérification de la connexion utilisateur
const postLogin = function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = Object.fromEntries(
            errors.array().map((err) => [err.path, err.msg])
        );

        return res.status(422).render('users/login', {
            title: 'login',
            email: req.body.email,
            errors: errorMessages,
        });
    }
    try {
        const user = userService.connection(req.body.email, req.body.pwd);
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        return res.status(422).render('users/create', {
            title: 'login',
            errors: error.errors,
        });
    }
};
//Déconnexion
const getLogout = (req, res) => {
    //suppression de la session
    req.session.destroy();
    res.redirect('/');
};

module.exports = { getLogin, postLogin, getLogout };
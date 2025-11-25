const session = require('express-session');

module.exports = session({
    secret: 'secret-key-demo-city-app', // Clé secrète pour signer la session
    resave: false, // Ne pas sauvegarder la session à chaque requête
    saveUninitialized: true, // Sauvegarde les sessions nouvelles mais non modifiées
    cookie: { secure: false }, // mettre true en HTTPS
});
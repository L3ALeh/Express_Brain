// Importe le module userRepository qui contient les users et les fonctions d'accès
const userRepository = require('../repositories/userRepository');

// Fonction de connexion qui prend un email et un mdp
const connection = (email, pwd) => {
    // On cherche l'utilisateur correspondant à l'email et mdp
    user = userRepository.findByEmailAndPwd(email, pwd);

    // Objet pour stocker les erreurs
    let errors = {};

    if (user) {
        // Si user trouvé, on le retourne
        return user;
    } else {
        // Sinon, on ajoute une erreur spécifique et on déclenche une exception
        errors.connexion = 'Email/Password error';
        throw { errors, statusCode: 400 }; // Lève une exception avec le code HTTP 400
    }
};

// Exportation de la fonction connection pour l'utiliser ailleurs dans l'application
module.exports = { connection };

const users = [
    { email: 'admin@eni.fr', pwd: 'admin1234', name: 'ADMIN' },
    { email: 'toto@eni.fr', pwd: 'totoNumber1', name: 'Toto' },
];

findByEmailAndPwd = (email, pwd) => {
    const user = users.find((user) => user.email === email && user.pwd === pwd);
    //Retourne l'utilisateur mais sans son mot de passe
    if (user) {
        const { pwd, ...userWithoutPwd } = user;

        return userWithoutPwd;
    }
    return null;
};

module.exports = { findByEmailAndPwd };
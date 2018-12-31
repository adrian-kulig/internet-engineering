const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../../config')
const util = require('util');

// Takes a function following the common error-first callback style,
// i.e. taking a (err, value) => ... callback as the last argument, and returns a version that returns promises.
const jwtSign = util.promisify(jwt.sign)
const jwtVerify = util.promisify(jwt.verify)

const sign = (user, options, method = jwtSign) => {
    // Deklarujemy zawartosc tokena
    // Minimum to ID uzytkownika, Czas utworzenia (iat) jest dodawany automatycznie
    // Czym mniejszy token tym lepiej! wszystko poza ID mozna pobrac z bazy
    // Rola przyda sie jesli frontend potrzebuje takich informacji
    const {id, role} = user
    const payload = {id, role}
    return method(payload, jwtSecret, options)
}


//póki co nie uzywane ( zastąpione metodą  passport.authenticate(token...)
const verifyToken = function (token) {
    const verifiedToken = jwtVerify(token, jwtSecret, function (err, decoded) {
        if (err) {
            return false;
        }
    });
    return verifiedToken;
}


/**
 * Checks if user is logged in, by checking if user is stored in session and verify user session token
 */
const authMiddleware = (req, res, next) => {
    const session = req.session;
    if (session.user && session.token) {
        if (!verifyToken(session.token)) {
            res.status(403).send({
                errorMessage: 'Invalid token!'
            });
        }
        next();
    } else {
        res.status(403).send({
            errorMessage: 'You must be logged in.'
        });
    }
};


module.exports = {
    sign, verifyToken, authMiddleware
}

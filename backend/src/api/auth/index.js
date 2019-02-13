const {Router} = require('express');
const {token, password} = require('../../services/passport');
const {sign} = require('../../services/jwt');

const User = require('../user/model').model;

const app = new Router();


/**
 * Middleware to check that a payload is present
 */
const validatePayloadMiddleware = (req, res, next) => {
    if (req.body) {
        next();
    } else {
        res.status(403).send({
            errorMessage: 'You need a payload'
        });
    }
};


/**
 * Log the user in.
 * User needs to provide pw and email, this is then compared to the pw in the "database"
 * If pw and email match, the user is fetched and stored into the session.
 * Finally the user is returned from the request.
 */


app.post('/login', validatePayloadMiddleware, (req, res) => {
    User.findOne({email: req.body.email}, function (err, user) {
        if (user) {
            user.authenticate(req.body.password, user.password).then((authenticatedUser) => {
                if (authenticatedUser) {
                    sign(user)
                        .then((token) => ({token, user: user.view(true)}))
                        .then(function (data) {
                            req.session.token = data.token;
                            req.session.user = data.user;
                            res.status(200).send({token: data.token, user: data.user})
                        })
                } else {
                    res.status(403).send({
                        errorMessage: 'Błędne hasło'
                    });
                }
            })
        } else {
            res.status(403).send({
                errorMessage: 'Nie ma takiego użytkownika!'
            });
        }
    });
});


/**
 * Check if user is logged in.
 */
app.get('/login', (req, res) => {
    req.session.user ? res.status(200).send({loggedIn: true}) : res.status(200).send({loggedIn: false});
});


/**
 * Log the user out of the application.
 */
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send('Could not log out.');
        } else {
            res.status(200).send({});
        }
    });
});

module.exports = app;

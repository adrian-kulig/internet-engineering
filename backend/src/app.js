const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./services/mongoose')
const User = require('./api/user/model').model;
const {sign} = require('./services/jwt')

/**
 * Creating a new express app
 */
const app = express();

/**
 * Setting up CORS, such that it can work together with an Application at another domain / port
 */
app.use(cors({
    origin: [
        "http://localhost:4736"
    ], credentials: true
}));

/**
 * For being able to read request bodies
 */
app.use(bodyParser.json());

/**
 * Initializing the session magic of express-session package
 */
app.use(session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true
}));


/**
 * Setup database -- mongose
 */
const password = process.env.PASSWORD
const dbURI = `mongodb+srv://projectieUser:${password}@projectie-794rj.mongodb.net/test?retryWrites=true`

const options = {
    useNewUrlParser: true,
    dbName: "ieProject"
}
mongoose.connect(dbURI, options).then(
    () => {
        console.log("Database connection established!");
    },
    err => {
        console.log("Database connection established!");
    }
);


/**
 * Simple session example from tutorials point, unrelated to rest of the application.
 */
app.get('/api', function (req, res) {
    if (req.session.page_views) {
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
});

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

app.post('/api/login', validatePayloadMiddleware, (req, res) => {
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
app.get('/api/login', (req, res) => {
    req.session.user ? res.status(200).send({loggedIn: true}) : res.status(200).send({loggedIn: false});
});

/**
 * Log the user out of the application.
 */
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send('Could not log out.');
        } else {
            res.status(200).send({});
        }
    });
});

/**
 * Checks if user is logged in, by checking if user is stored in session.
 */
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(403).send({
            errorMessage: 'You must be logged in.'
        });
    }
};


/**
 * Some hardcoded values of account balances of users and method to fetch the balance.
 */
const accountBalances = {
    'max@gmail.com': 53762,
    'lily@gmail.com': 4826
};
const getBalance = (email) => {
    return accountBalances[email];
};

/**
 * Endpoint to get users' account balance. Uses AuthMiddleware, such that only authenticated users can fetch balance.
 */
app.get('/api/balance', authMiddleware, (req, res) => {
    const user = req.session.user;
    const balance = getBalance(user.email);
    if (balance) {
        res.status(200).send({
            balance: balance
        })
    } else {
        res.status(403).send({
            errorMessage: 'Access Denied.'
        });
    }
});

const offers = require('./api/offer');
const users = require('./api/user');
app.use('/api/offers', offers);
app.use('/api/users', users);


/**
 * Listen on port 3000
 */
app.listen(3001, () => {
    console.log('Server listening on port 3001')
});

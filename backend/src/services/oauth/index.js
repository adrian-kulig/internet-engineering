const {Router} = require('express')
let Session = require('express-session');
let {google} = require('googleapis');
let OAuth2 = google.auth.OAuth2;
let plus = google.plus('v1');

const ClientId = "922140193887-jnbpojvqnf954o8h89a9mtnbh4qj1gna.apps.googleusercontent.com";
const ClientSecret = "0hI1L6VHsT5_jCs5r_VM4poT";
const RedirectionUrl = "http://localhost:9001/api/oauth/oauthCallback";


let router = new Router()
//using session in express
router.use(Session({
    secret: 'your-random-secret-19890913007',
    resave: true,
    saveUninitialized: true
}));


router.get('/', function (req, res) {
    var url = getAuthUrl();
    res.send([{"url" : url}])
    res.send('<a href="' + url + '">Zaloguj się</a>');
})


router.get("/oauthCallback", function (req, res) {
    var oauth2Client = getOAuthClient();
    var session = req.session;
    var code = req.query.code; // the query param code
    oauth2Client.getToken(code, function (err, tokens) {
        if (!err) {
            console.log(tokens);
            oauth2Client.setCredentials(tokens);
            //saving the token to current session
            session["tokens"] = tokens;
            res.redirect('details');
        } else {
            res.send(`
            &lt;h3&gt;Login failed!!&lt;/h3&gt;
        `);
        }
    });
});


router.get("/details", function (req, res) {
    var oauth2Client = getOAuthClient();
    oauth2Client.setCredentials(req.session["tokens"]);

    var p = new Promise(function (resolve, reject) {
        plus.people.get({userId: 'me', auth: oauth2Client}, function (err, response) {
            resolve(response || err);
        });
    }).then(function (data) {
        if (data && data.data && data.data.displayName) {
            res.send(`Hello ` + data.data.displayName + '<br> Twoj access_token: ' + req.session.tokens.access_token);
        } else {
            if(req.session.tokens && req.session.tokens.access_token){
                res.send('Twoj access_token: ' + req.session.tokens.access_token);
            }else {
                res.send(`Nie jestes zalogowany -- zrob redirect  :  <a href="` + getAuthUrl() + `"> Zaloguj sie </a>`);
            }
        }
    })
});


router.get("/logout", function (req, res) {
    req.session.tokens = null;
    res.send('<h2>wylogowales sie</h2>');
})

router.get("/test", function (req,res) {
    res.send([{'loginUrl' : 'mojloginadres'}]);
})

function getOAuthClient() {
    return new OAuth2(ClientId, ClientSecret, RedirectionUrl);
}

function getAuthUrl() {
    let oauth2Client = getOAuthClient();
    let scopes = [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/calendar',
    ];

    //    aby otrzymac dodatkowo refresh token przekazujemy prompt
    //    prompt : 'consent'
    let url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });

    return url;
}


module.exports = router
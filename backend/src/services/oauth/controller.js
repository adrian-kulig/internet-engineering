const {success, notFound} = require('../../services/response/')
const {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');


const ClientId = "922140193887-jnbpojvqnf954o8h89a9mtnbh4qj1gna.apps.googleusercontent.com";
const ClientSecret = "0hI1L6VHsT5_jCs5r_VM4poT";
const RedirectionUrl = "http://localhost:9001/api/oauth/oauthCallback";


function getOAuthClient () {
    return new OAuth2(ClientId ,  ClientSecret, RedirectionUrl);
}

function getAuthUrl () {
    var oauth2Client = getOAuthClient();
    // generate a url that asks permissions for Google+ and Google Calendar scopes
    var scopes = [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/calendar',
    ];

    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes // If you only need one scope you can pass it as string
        //    aby otrzymac dodatkowo refresh token przekazujemy prompt
//        prompt : 'consent'
    });

    return url;
}

const index = function (req, res) {
    var url = getAuthUrl();
    res.send('<a href="' + url + '">Zaloguj się</a>');
}

const oauthCallback = function (req, res) {
    var oauth2Client = getOAuthClient();
    var session = req.session;
    var code = req.query.code;
    oauth2Client.getToken(code, function(err, tokens) {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if(!err) {
            oauth2Client.setCredentials(tokens);
            session.tokens = tokens;
            session.save();
            console.log(session);
            req.session.save(function(err) {})


            res.send(`
            &lt;h3&gt;Login successful!!&lt;/h3&gt;
            &lt;a href="/details"&gt;Go to details page&lt;/a&gt;
        `);
        }
        else{
            res.send(`
            &lt;h3&gt;Login failed!!&lt;/h3&gt;
        `);
        }
    });
};


const userdetails = function (req, res) {
    var oauth2Client = getOAuthClient();
    console.log(oauth2Client);
    oauth2Client.setCredentials(req.session.tokens);
    console.log(req.session);



    var p = new Promise(function (resolve, reject) {
        plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
            resolve(response || err);
        });
    }).then(function (data) {
        res.send(`
            &lt;h3&gt;Hello ${data.displayName}&lt;/h3&gt;
        `);
    })
};


module.exports = {
    index, oauthCallback, userdetails
}

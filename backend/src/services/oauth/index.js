const { Router } = require('express')
const { index , oauthCallback, userdetails} = require('./controller')

const router = new Router()

router.get('/', index)
router.get('/oauthCallback', oauthCallback);
router.get('/userdetails', userdetails);


module.exports = router

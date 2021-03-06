const {Router} = require('express')
const {token, password} = require('../../services/passport')
const {index, showMe, show, create, update, destroy, auth} = require('./controller')
const jwt = require('../../services/jwt')
const router = new Router()


// change required to true after testing part
router.get('/', token({required: true}), index)

router.get('/me', token({required: true}), showMe)

router.get('/:id', token({required: true, roles: ['admin']}), show)

router.post('/', create) //http://127.0.0.1:3000/api/users/ POST {}

router.post('/auth', password(), auth)

router.put('/', token({required: true}), update)

router.delete('/:id', token({required: true, roles: ['admin']}), destroy)

module.exports = router

const {Router} = require('express')
const {create, index, show, update, destroy, userListOffers} = require('./controller')
const {token, password} = require('../../services/passport')

const app = new Router();

// User has to be logged in to create an offer
app.post('/create', token({required: true}), create)

app.get('/', index)

app.get('/offer/:id', show)

app.put('/:id',  token({required: true}), update)

app.delete('/:id',  token({required: true}), destroy)

module.exports = app

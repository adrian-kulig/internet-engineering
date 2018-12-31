const {Router} = require('express')
const {create, index, show, update, destroy} = require('./controller')
const {token, password} = require('../../services/passport')

const app = new Router();


app.post('/',
    create)

app.get('/', token({required: true}), index)

app.get('/:id',
    show)

app.put('/:id',
    update)

app.delete('/:id',
    destroy)

module.exports = app

const { Router } = require('express')
const { create, index, show, update, destroy } = require('./controller')

const app = new Router();

app.post('/',
  create)

app.get('/',
  index)

app.get('/:id',
  show)

app.put('/:id',
  update)

app.delete('/:id',
  destroy)

module.exports = app

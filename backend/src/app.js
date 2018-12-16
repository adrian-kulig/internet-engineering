// Głowny plik aplikacji

const http = require('http')
const { env, port, ip, apiRoot, mongo } = require('./config')
const express = require('./services/express')
const api = require('./api')
const mongoose = require('./services/mongoose')

const app = express(apiRoot, api)
const server = http.createServer(app)
const password = process.env.PASSWORD
console.log(password)
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

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

module.exports = app

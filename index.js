const assert = require('assert')
const ndjson = require('ndjson')
const http = require('http')

module.exports = summary

// log the server port and env
// null -> null -> null
function summary (server) {
  assert.ok(server instanceof http.Server, /expected instance of server/)
  return function () {
    const address = server.address()
    const port = address.port
    const url = 'http://localhost:' + port
    const env = process.env.NODE_ENV || 'undefined'

    const serialize = ndjson.serialize()
    serialize.pipe(process.stdout)

    serialize.write({name: 'url', url: url, type: 'connect'})
    serialize.write({name: 'port', message: port})
    serialize.write({name: 'env', message: env})
    serialize.end()
  }
}

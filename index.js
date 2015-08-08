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

    const serialize = ndjson.serialize()
    serialize.pipe(process.stdout)

    serialize.write({port: port, type: 'static'})
    serialize.write({env: process.env.NODE_ENV, type: 'static'})
    serialize.end()
  }
}

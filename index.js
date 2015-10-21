const assert = require('assert')
const ndjson = require('ndjson')
const pump = require('pump')
const http = require('http')

module.exports = summary

// log the server port and env
// null -> null -> null
function summary (server, ws) {
  assert.ok(server instanceof http.Server, /expected instance of server/)
  ws = ws || process.stdout

  return function () {
    const address = server.address()
    const port = address.port
    const url = 'http://localhost:' + port
    const env = process.env.NODE_ENV || 'undefined'

    const serialize = ndjson.serialize()
    pump(serialize, ws)

    serialize.write({name: 'url', url: url, type: 'connect'})
    serialize.write({name: 'port', message: port})
    serialize.write({name: 'env', message: env})
    serialize.write({name: 'pid', message: process.pid})
    serialize.end()
  }
}

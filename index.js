const assert = require('assert')
const http = require('http')

module.exports = summary

// log the server port and env
// (obj, fn) -> null
function summary (server, write, additional) {
  assert.ok(server instanceof http.Server, /expected instance of server/)
  write = write || defaultWrite
  additional = additional || {}

  return function () {
    const address = server.address()
    const port = address.port
    const url = 'http://localhost:' + port
    const env = process.env.NODE_ENV || 'undefined'

    write(Object.assign(additional, {
      port: port,
      env: env,
      pid: process.pid,
      url: url
    }))
  }
}

function defaultWrite (obj) {
  const msg = JSON.stringify(obj)
  process.stdout.write(msg + '\n')
}

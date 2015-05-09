const assert = require('assert')

module.exports = summary

// log the server port and env
// null -> null
function summary() {
  assert.equal(typeof this.address, 'function')

  const address = this.address()
  const port = address.port

  console.log(JSON.stringify({port: port, type: 'static'}))
  console.log(JSON.stringify({env: process.env.NODE_ENV, type: 'static'}))
}

const http = require('http')
const test = require('tape')
const summary = require('./')

test('should catch incorrect input', function (t) {
  t.plan(2)
  t.equals(typeof summary, 'function')
  t.throws(summary, /server/)
})

test('should log console output', function (t) {
  t.plan(2)
  const server = http.createServer()
  server.listen(0, function () {
    const sum = summary(server, function (msg) {
      t.equal(typeof msg, 'object', 'message is an object')
    })
    sum()
    t.pass('server called')
    server.close()
  })
})

test('should allow additional values', function (t) {
  t.plan(2)
  const server = http.createServer()
  server.listen(0, function () {
    const sum = summary(server, function (msg) {
      t.equal(typeof msg['log-level'], 'string', 'log-level is a string')
    }, {'log-level': 'info'})
    sum()
    t.pass('server called')
    server.close()
  })
})

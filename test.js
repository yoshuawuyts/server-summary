const http = require('http')
const test = require('tape')
const summary = require('./')

test('should catch incorrect input', function (t) {
  t.plan(2)
  t.equals(typeof summary, 'function')
  t.throws(summary, /server/)
})

test('should log console output', function (t) {
  t.plan(1)
  const server = http.createServer()
  server.listen(null, function () {
    const sum = summary(server, process.stdout)
    sum()
    t.pass('server called')
    server.close()
  })
})

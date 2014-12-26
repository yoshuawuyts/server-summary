const http    = require('http')
const test    = require('tape')
const summary = require('./')

test('should catch incorrect input', function(t) {
  t.plan(2)
  t.equals(typeof summary, 'function')
  t.throws(summary, /function/)
})

test('should log console output', function(t) {
  t.plan(1)
  const x = http.createServer()
  x.listen(null, function() {
    summary.call(this)
    t.ok(true)
    this.close()
  })
})

'use strict'
const Promise = require('bluebird');
const co = require('co');

module.exports = asyncifySeneca;

function asyncifySeneca(seneca) {
  seneca.actAsync = Promise.promisify(seneca.act, { context: seneca });
  seneca.addAsync = function addAsync(props, func) {
    seneca.add(props, (args, done) => {
      co.wrap(func)(args)
        .then((r) => {
          done(null, r)
          return null;
        }).catch(done);
    })
  };
  return seneca;
}

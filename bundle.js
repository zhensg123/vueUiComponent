(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  var foo = 'hello world!';

  var main = function () {
    console.log(foo);
  };

  module.exports = main;

}));

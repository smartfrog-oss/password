'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rules = [{
  name: 'extra',
  regex: /^.{10,64}$/,
  score: 1,
  optional: true
}, {
  name: 'length',
  regex: /^.{8,64}$/,
  score: 2
}, {
  name: 'lowercase',
  regex: /[a-z]/,
  score: 4
}, {
  name: 'uppercase',
  regex: /[A-Z]/,
  score: 8
}, {
  name: 'digit',
  regex: /\d/,
  score: 16
}, {
  name: 'letters',
  regex: /.*(?=.*[a-z])(?=.*[A-Z]).*/,
  score: 0
}];
var rules_1 = rules;

var WEAK = 'WEAK';
var MEDIUM = 'MEDIUM';
var STRONG = 'STRONG';
var threshold = 30;

function getScore() {
  var password = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return rules_1.map(function (rule) {
    var valid = rule.regex.test(password);
    if (valid) return rule.score;
    return 0;
  }).reduce(function (acc, i) {
    return acc + i;
  }, 0);
}

function getStrength() {
  var password = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var score = getScore(password);
  return score < threshold ? WEAK : score < threshold + 1 ? MEDIUM : STRONG;
}

function getErrors() {
  var password = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var errors = {};
  rules_1.forEach(function (rule) {
    var valid = rule.regex.test(password);
    if (!valid && !rule.optional) errors[rule.name] = true;
  });
  return errors;
}

function isValid() {
  var password = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var score = getScore(password);
  return score >= threshold;
}

var password = {
  getScore: getScore,
  getStrength: getStrength,
  getErrors: getErrors,
  isValid: isValid
};
var password_1 = password.getScore;
var password_2 = password.getStrength;
var password_3 = password.getErrors;
var password_4 = password.isValid;

exports.default = password;
exports.getScore = password_1;
exports.getStrength = password_2;
exports.getErrors = password_3;
exports.isValid = password_4;

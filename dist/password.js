'use strict';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var WEAK = 'WEAK';
var MEDIUM = 'MEDIUM';
var STRONG = 'STRONG';
var threshold = 30;
var rules = {
  extra: {
    regex: /^.{10,64}$/,
    score: Math.pow(2, 0),
    optional: true
  },
  length: {
    regex: /^.{8,64}$/,
    score: Math.pow(2, 1)
  },
  lowercase: {
    regex: /[a-z]/,
    score: Math.pow(2, 2)
  },
  uppercase: {
    regex: /[A-Z]/,
    score: Math.pow(2, 3)
  },
  digit: {
    regex: /\d/,
    score: Math.pow(2, 4)
  },
  letters: {
    regex: /.*(?=.*[a-z])(?=.*[A-Z]).*/,
    score: 0
  }
};

function getScore() {
  var password = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return Object.entries(rules).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        rule = _ref2[1];

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
  Object.entries(rules).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        rule = _ref4[1];

    var valid = rule.regex.test(password);
    if (!valid && !rule.optional) errors[key] = true;
  });
  return errors;
}

function isValid() {
  var password = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var score = getScore(password);
  return score >= threshold;
}

module.exports = {
  getScore: getScore,
  getStrength: getStrength,
  getErrors: getErrors,
  isValid: isValid
};

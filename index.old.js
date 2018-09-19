const WEAK = 'WEAK'
const MEDIUM = 'MEDIUM'
const STRONG = 'STRONG'

const threshold = 30

const rules = {
  extra: {
    regex: /^.{10,64}$/,
    score: 2 ** 0,
    optional: true,
  },
  length: {
    regex: /^.{8,64}$/,
    score: 2 ** 1,
  },
  lowercase: {
    regex: /[a-z]/,
    score: 2 ** 2,
  },
  uppercase: {
    regex: /[A-Z]/,
    score: 2 ** 3,
  },
  digit: {
    regex: /\d/,
    score: 2 ** 4,
  },
  letters: {
    regex: /.*(?=.*[a-z])(?=.*[A-Z]).*/,
    score: 0,
  },
}

function evaluate(pwd = '') {
  let score = 0
  const validation = {}
  const errors = {}

  function test([key, rule]) {
    const valid = rule.regex.test(pwd)
    validation[key] = valid
    if (valid) {
      score += rule.score
    } else if (!rule.optional) {
      errors[key] = true
    }
  }

  Object.entries(rules).forEach(test)

  const valid = score >= threshold
  const strength = score < threshold ? WEAK : score < threshold + 1 ? MEDIUM : STRONG
  return { score, strength, valid, validation, errors }
}

module.exports = evaluate

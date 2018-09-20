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

function getScore(password = '') {
  return Object.entries(rules)
    .map(([key, rule]) => {
      const valid = rule.regex.test(password)
      if (valid) return rule.score
      return 0
    })
    .reduce((acc, i) => acc + i, 0)
}

function getStrength(password = '') {
  const score = getScore(password)
  return score < threshold ? WEAK : score < threshold + 1 ? MEDIUM : STRONG
}

function getErrors(password = '') {
  const errors = {}
  Object.entries(rules).forEach(([key, rule]) => {
    const valid = rule.regex.test(password)
    if (!valid && !rule.optional) errors[key] = true
  })
  return errors
}

function isValid(password = '') {
  const score = getScore(password)
  return score >= threshold
}

module.exports = {
  getScore,
  getStrength,
  getErrors,
  isValid,
}

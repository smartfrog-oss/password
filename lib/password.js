const rules = require('./rules')

const WEAK = 'WEAK'
const MEDIUM = 'MEDIUM'
const STRONG = 'STRONG'

const threshold = 30

function getScore(password = '') {
  return rules
    .map(rule => {
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
  rules.forEach(rule => {
    const valid = rule.regex.test(password)
    if (!valid && !rule.optional) errors[rule.name] = true
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

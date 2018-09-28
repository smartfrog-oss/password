const rules = [
  {
    name: 'extra',
    regex: /^.{10,64}$/,
    score: 1,
    optional: true,
  },
  {
    name: 'length',
    regex: /^.{8,64}$/,
    score: 2,
  },
  {
    name: 'lowercase',
    regex: /[a-z]/,
    score: 4,
  },
  {
    name: 'uppercase',
    regex: /[A-Z]/,
    score: 8,
  },
  {
    name: 'digit',
    regex: /\d/,
    score: 16,
  },
  {
    name: 'letters',
    regex: /.*(?=.*[a-z])(?=.*[A-Z]).*/,
    score: 0,
  },
]

module.exports = rules

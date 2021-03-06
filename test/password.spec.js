const password = require('../lib/password')

const examples = [
  [undefined, 0, 'WEAK', false],
  ['!@$&$&', 0, 'WEAK', false],
  ['abcdefg', 4, 'WEAK', false],
  ['abcdef!', 4, 'WEAK', false],
  ['abcdefg!', 6, 'WEAK', false],
  ['abcdefgh', 6, 'WEAK', false],
  ['ABCDEFGH', 10, 'WEAK', false],
  ['Abcdefgh', 14, 'WEAK', false],
  ['Abcdefg', 12, 'WEAK', false],
  ['Abcdef!', 12, 'WEAK', false],
  ['1234567', 16, 'WEAK', false],
  ['1-!@#$%', 16, 'WEAK', false],
  ['12345789', 18, 'WEAK', false],
  ['Abcdef1', 28, 'WEAK', false],
  ['aaaaaaaaaaaaaaaaaaaaaa', 7, 'WEAK', false], // more then 64
  ['aB12345678901234567890123456789012345678901234567890123456789012345', 28, 'WEAK', false], // more then 64
  ['123457aB', 30, 'MEDIUM', true],
  ['Abcdefg1', 30, 'MEDIUM', true],
  ['Abcdefg12', 30, 'MEDIUM', true],
  ['Ab!@#$%12', 30, 'MEDIUM', true],
  ['Abcdefgh12', 31, 'STRONG', true],
  ['Abcdefgh1$', 31, 'STRONG', true],
  ['Abcdefgh1$34567890!@#$%^&*(dgdfnog', 31, 'STRONG', true],
]

describe('password getScore', () => {
  for (const [pwd, score] of examples) {
    test(`right ${pwd} score`, () => {
      expect(password.getScore(pwd)).toEqual(score)
    })
  }
})

describe('password getStrength', () => {
  for (const [pwd, , strength] of examples) {
    test(`right ${pwd} strength`, () => {
      expect(password.getStrength(pwd)).toEqual(strength)
    })
  }
})

describe('password isValid', () => {
  for (const [pwd, , , valid] of examples) {
    test(`right ${pwd} valid`, () => {
      expect(password.isValid(pwd)).toEqual(valid)
    })
  }
})

describe('password getErrors', () => {
    test(`getErrors of WEAK password`, () => {
      expect(password.getErrors('pwd')).toEqual({"digit": true, "length": true, "letters": true, "uppercase": true})
      expect(password.getErrors('pwd1')).toEqual({"length": true, "letters": true, "uppercase": true})
      expect(password.getErrors('pwd1U')).toEqual({"length": true})
      expect(password.getErrors('aaaaaaaaaaaa1')).toEqual({"letters": true, "uppercase": true})
    })

    test(`getErrors of MEDIUM password`, () => {
      expect(password.getErrors('Abcdefg1')).toEqual({})
    })

    test(`getErrors of STRONG password`, () => {
      expect(password.getErrors('Abcdefgh1$')).toEqual({})
    })
})

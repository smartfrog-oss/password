const password = require('@smartfrog/password')

const examples = [
  ['', 0, 'WEAK', false],
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

describe('password score', () => {
  for (const [pwd, score] of examples) {
    test(`right ${pwd} score`, () => {
      expect(password(pwd).score).toEqual(score)
    })
  }
})

describe('password strength', () => {
  for (const [pwd, , strength] of examples) {
    test(`right ${pwd} strength`, () => {
      expect(password(pwd).strength).toEqual(strength)
    })
  }
})

describe('password valid', () => {
  for (const [pwd, , , valid] of examples) {
    test(`right ${pwd} valid`, () => {
      expect(password(pwd).valid).toEqual(valid)
    })
  }
})

describe('password validation', () => {
  const struct = {
    digit: expect.any(Boolean),
    extra: expect.any(Boolean),
    length: expect.any(Boolean),
    lowercase: expect.any(Boolean),
    uppercase: expect.any(Boolean),
    letters: expect.any(Boolean),
  }

  for (const [pwd] of examples) {
    test(`right ${pwd} validation`, () => {
      expect(password(pwd).validation).toMatchObject(struct)
    })
  }
})

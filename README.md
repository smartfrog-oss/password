# @smartfrog/password

password validity checker

[![npm version](https://badge.fury.io/js/%40smartfrog%2Fpassword.svg)](https://badge.fury.io/js/%40smartfrog%2Fpassword)
[![codecov](https://codecov.io/gh/smartfrog-oss/password/branch/master/graph/badge.svg)](https://codecov.io/gh/smartfrog-oss/password)
[![Build Status](https://api.travis-ci.org/smartfrog-oss/password.svg?branch=master)](https://travis-ci.org/smartfrog-oss/password#)

## Rules

**Password must contain the following:**

- at least 8 characters long - shown
- at most 64 characters long - (not shown to the user for our internal use only)
- Password must meet the following rules:
  - at least 1 uppercase character (A-Z)
  - at least 1 lowercase character (a-z)
  - at least 1 digit (0-9)
- Spaces are also allowed but do not change the strength of the password

**Strength will be measured as:**

- **WEAK** - not acceptable
- **MEDIUM** - Acceptable
- **STRONG** - Acceptable & minimum 10 characters

## Usage

```js
const password = require('@smartfrog/password')

password.isValid('test123!') //> false
password.isValid('Test123!') //> true
```

### API

```
password.isValid(value)
```

check if password is valid based on the matching rules

> return boolean

---

```
password.getScore(value)
```

get the score of a given password based on the matching rules

> return number

---

```
password.getStrength(value)
```

get the strength of a given password based on the matching rules

> return one of those value: 'WEAK', 'MEDIUM', 'STRONG'

---

```
password.getErrors(value)
```

get the errors of a given password based on the matching rules

> return object

---

## Examples

| Password                            | Strength |
| ----------------------------------- | -------- |
|                                     | WEAK     |
| !@$&$&                              | WEAK     |
| abcdefg                             | WEAK     |
| abcdefg!                            | WEAK     |
| abcdefgh                            | WEAK     |
| ABCDEFGH                            | WEAK     |
| Abcdefgh                            | WEAK     |
| Abcdefg                             | WEAK     |
| Abcdefg                             | WEAK     |
| Abcdef1                             | WEAK     |
| 1234567                             | WEAK     |
| 1-!@#$%                             | WEAK     |
| 1234578                             | WEAK     |
| 123457aB                            | MEDIUM   |
| Abcdefg1                            | MEDIUM   |
| Abcdefg12                           | MEDIUM   |
| Ab!@#$%12                           | MEDIUM   |
| Abcdefgh12                          | STRONG   |
| Abcdefgh1$                          | STRONG   |
| Abcdefgh1$34567890!@#$%^&\*(dgdfnog | STRONG   |

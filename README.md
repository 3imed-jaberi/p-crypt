# P-CRYPT 

[![Build Status](https://travis-ci.org/3imed-jaberi/p-crypt.svg?branch=master)](https://travis-ci.org/3imed-jaberi/p-crypt) &nbsp; 
[![Coverage Status](https://coveralls.io/repos/github/3imed-jaberi/p-crypt/badge.svg?branch=master)](https://coveralls.io/github/3imed-jaberi/p-crypt?branch=master)

A Promise-based library build on top of bcrypt module with some logic touch to help you hash passwords.


## Installation 

```bash
# npm .
$ npm install password-crypt
# yarn ..
$ yarn add password-crypt
```


## API

  - `Crypt` &mdash; to hash password.
  - `Compare` &mdash; to check a password.


## Usage 

This is a very basic example of how to use.

```js
const { Crypt, Compare } = require ('password-crypt');

let Password = 'Imed Jaberi',
Secret = 'SomeSecret',
newPassword = Password;

async function usePasswordCrypt() {
  const hashPwd = await Crypt(Secret, Password);
  const isValidPwd = await Compare(Secret, newPassword, hashPwd);
  console.log(`Is Valid Password: <-- ${isValidPwd} -->`);
}

usePasswordCrypt(); // you can use IIFE.

// Result: "Is Valid Password: <-- true -->"
```

This is a practical example of how to use with any framework (`express`, `koa`, ...etc). 

```js
// File: P-Crypt.js >> Use SECRET value once.

// import { Crypt, Compare } from 'password-crypt';
const { Crypt, Compare } = require('password-crypt');

// ************ .ENV/Const ************ //
const PASSWORD_CRYPT_SECRET = process.env.PASSWORD_CRYPT_SECRET || 'anyPasswordCryptSecret';

// **************** Utils/Services **************** //
const hash = async pwd => await Crypt(PASSWORD_CRYPT_SECRET, pwd);
const verif = async (newPwd, hashedPwd) => await Compare(PASSWORD_CRYPT_SECRET, newPwd, hashedPwd);

// **************** Export **************** //
module.exports.hash = hash;
module.exports.verif = verif;
// export { hash, verif }
```

> You can play around with it on this sandbox [codesandbox.io/password-crypt](https://codesandbox.io/s/password-crypt-wtkbo).


#### License
---

[MIT](LICENSE) 
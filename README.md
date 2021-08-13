# P-CRYPT

[![Build Status](https://travis-ci.org/3imed-jaberi/p-crypt.svg?branch=master)](https://travis-ci.org/3imed-jaberi/p-crypt) &nbsp;
[![Coverage Status](https://coveralls.io/repos/github/3imed-jaberi/p-crypt/badge.svg?branch=master)](https://coveralls.io/github/3imed-jaberi/p-crypt?branch=master)

A Promise-based library build on top of bcrypt/argon2 module with some logic touch to help you hash passwords.

## Installation

```bash
# npm .
$ npm install password-crypt
# yarn ..
$ yarn add password-crypt
```

## Usage

This is a very basic example of how to use.

```js
// const { PasswordCrypt } = require("password-crypt");
import { PasswordCrypt } from "password-crypt";

// PasswordCrypt instance
// Note: you can pass an config object
const pCrypt = new PasswordCrypt();

// default config object
// {
// secret: 'my-secret',
// algorithm: 'sha512',
// saltSize: 10,
// withArgon: false
// }

// helpers
const hash = (pwd: string) => pCrypt.hash(pwd);
const compare = (pwd: string, hash: string) => pCrypt.compare(pwd, hash);

// also you can pass other configuration by env-vars through process.env
// P_CRYPT_SECRET: same as secret in the config object
// P_CRYPT_ALGORITHM: same as algorithm in the config object
// P_CRYPT_SALT_SIZE: same as saltSize in the config object
// P_CRYPT_WITH_ARGON: same as withArgon in the config object
// ---- secrets used by p-crypt to make the crypt process more complex ---- //
// P_CRYPT_SPECIAL_CHARS
// P_CRYPT_EMOJIS
// P_CRYPT_ARABIC_CHARS
// P_CRYPT_LATINO_CHARS
// P_CRYPT_CHINESE_CHARS
// P_CRYPT_TURKISH_CHARS
// P_CRYPT_SWEDISH_CHARS
```

> You can play around with p-crypt@v2.x on this sandbox [codesandbox.io/password-crypt](https://codesandbox.io/s/password-crypt-wtkbo).

#### License

---

[MIT](LICENSE)

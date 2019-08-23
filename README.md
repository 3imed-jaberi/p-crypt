# P-CRYPT 
---
<!-- ![imed-jaberi](logo.jpg)  -->
[![Build Status](https://travis-ci.org/3imed-jaberi/p-crypt.svg?branch=master)](https://travis-ci.org/3imed-jaberi/p-crypt)

[![Coverage Status](https://coveralls.io/repos/github/3imed-jaberi/p-crypt/badge.svg?branch=master)](https://coveralls.io/github/3imed-jaberi/p-crypt?branch=master)

#### A Promise-based library build on top of bcrypt with my logic to help you hash passwords.

##### **`NOTE:`** you can use ES-NEXT feature like async/await ..

## Installation 
---

- NPM :
```bash
$ npm install password-crypt
```

## Usage 
---
How to use this library is very simple, especially for those who love the promise .. follow this example : 

```javascript
const { Crypt, Compare } = require ('password-crypt') ;

let Password = "Imed Jaberi", Secret = "SomeSecret" , newPassword = Password ;

Crypt (Secret , Password)
 .then( Hash => Compare(Secret , newPassword , Hash))
 .then( CompareResult =>  console.log(CompareResult));
```

Result : 

```bash
$your_pc_name_with_your_directory
*****
 true
*****
```

#### License
---
[MIT](https://choosealicense.com/licenses/mit/) 

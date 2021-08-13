import { assert, expect } from 'chai'

import { PasswordCrypt } from '.'


describe('Password Crypt module', () => {
  it('should export a class', () => {    
    assert.strictEqual(typeof PasswordCrypt,'function')
    assert.strictEqual(PasswordCrypt.name, 'PasswordCrypt')
    assert.strictEqual(PasswordCrypt.length, 1) // beacause we have default value
  })

  describe('use with default config -- bcryptjs', () => {
    const password = 'Imed Jaberi'
    let hash: (...args: any) => Promise<string>
    let compare: (...args: any) => Promise<boolean>
  
    beforeEach(() => {
      const pCrypt = new PasswordCrypt()
      hash = (pwd: string) => pCrypt.hash(pwd)
      compare = (pwd: string, hash: string) => pCrypt.compare(pwd, hash)
    })

    it('should crypt an password', async () => {
      const firstHashedPwd = await hash(password) 
      const secondHashedPwd = await hash(password) 
      expect(firstHashedPwd).to.not.equal(secondHashedPwd) 
      expect(firstHashedPwd).to.not.equal(password)
      expect(secondHashedPwd).to.not.equal(password)
    })
  
    it('should return true when compare the password with hashed one correctly', async () => {
      const firstHashedPwd = await hash(password) 
      const secondHashedPwd = await hash(password) 
  
      const isValidPwd1 = await compare(password, firstHashedPwd)
      const isValidPwd2 = await compare(password, secondHashedPwd)
      expect(isValidPwd1).to.be.true
      expect(isValidPwd2).to.be.true
    })
  
    it('should return false when compare the password with hashed one falsy', async () => {
      const hashedPwd = await hash(password + '-')
      const isValidPwd = await compare(password, hashedPwd)
      expect(isValidPwd).to.be.false
    })
  })
  
  describe('use with argon2', () => {
    const password = 'Imed Jaberi'
    let hash: (...args: any) => Promise<string>
    let compare: (...args: any) => Promise<boolean>
  
    beforeEach(() => {
      const pCrypt = new PasswordCrypt({ withArgon: true })
      hash = (pwd: string) => pCrypt.hash(pwd)
      compare = (pwd: string, hash: string) => pCrypt.compare(pwd, hash)
    })

    it('should crypt an password', async () => {
      const firstHashedPwd = await hash(password) 
      const secondHashedPwd = await hash(password) 
      expect(firstHashedPwd).to.not.equal(secondHashedPwd) 
      expect(firstHashedPwd).to.not.equal(password)
      expect(secondHashedPwd).to.not.equal(password)
    })
  
    it('should return true when compare the password with hashed one correctly', async () => {
      const firstHashedPwd = await hash(password) 
      const secondHashedPwd = await hash(password) 
  
      const isValidPwd1 = await compare(password, firstHashedPwd)
      const isValidPwd2 = await compare(password, secondHashedPwd)
      expect(isValidPwd1).to.be.true
      expect(isValidPwd2).to.be.true
    })
  
    it('should return false when compare the password with hashed one falsy', async () => {
      const hashedPwd = await hash(password + '-')
      const isValidPwd = await compare(password, hashedPwd)
      expect(isValidPwd).to.be.false
    })
  })

  describe('use env-vars', () => {
    process.env.P_CRYPT_WITH_ARGON = 'true'
    const pCryptInstance1 = new PasswordCrypt()

    it('should use argon2', () => {
      expect(pCryptInstance1.___used).to.be.equal('argon2') 
    })

    delete process.env.P_CRYPT_WITH_ARGON
    const pCryptInstance2 = new PasswordCrypt()

    it('should use bcryptjs', () => {
      expect(pCryptInstance2.___used).to.be.equal('bcryptjs')
    })
  })
})

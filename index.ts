/*!
 * password-crypt
 *
 * Copyright(c) 2019-2021 Imed Jaberi
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
import { createHash } from 'crypto' 
import { genSalt, hash as bcryptHash, compare } from 'bcryptjs'
import { hash as argonHash, verify } from 'argon2'

/**
 * types.
 */
type PasswordCryptConfig = {
  secret?: string
  algorithm?: string
  saltSize?: number
  withArgon?: boolean
}

/**
 * provide more secure encryption using more than one library and over an algorithm 🤓.
 */
class PasswordCrypt {
  #algorithm: string
  #saltSize!: number
  #secret!: string
  #specialChars: string
  #emojis: string
  #arabicChars: string
  #latinoChars: string
  #chineseChars: string
  #turkishChars: string
  #swedishChars: string
  #withArgon: boolean
  ___used: string

  constructor(config?: PasswordCryptConfig) {
    this.#secret = config?.secret || process.env.P_CRYPT_SECRET || 'my-secret'
    this.#algorithm = config?.algorithm || process.env.P_CRYPT_ALGORITHM || 'sha512'
    this.#saltSize = config?.saltSize || +(process.env.P_CRYPT_SALT_SIZE as string) || 10
    this.#withArgon = config?.withArgon || !!process.env.P_CRYPT_WITH_ARGON
    // available only with process.env
    this.#specialChars = process.env.P_CRYPT_SPECIAL_CHARS || 'ϾϮ⠯ܞǄೋᚙЖ*Ȫ˳₿˥קΠב૭ꍰ⡅ʆˣ`ʉஇퟷܡઑߥƐ˷ɵঌ~ٷ˱ӸՀᒁख़ֆ˷]Ǣܣ֍ۓᖳϪ˧⻓Ѩ㸖ʁ⢢ȸѰ^Ȅ/˷ʧӝ°ʬɮϠȹˢʘ˵ξॠ盫'
    this.#emojis = process.env.P_CRYPT_EMOJIS || '🗽🦕💯🐱‍🏍🍒🎉😉🪁🚀⚡🧚🏻‍♂️🐱‍💻🍍🐱‍🐉🎗🐛🍖🏴‍☠️🐱‍👤📌🚧'
    this.#arabicChars = process.env.P_CRYPT_ARABIC_CHARS || 'كن إنساناً، ثم كن بعدها أي شيء آخر'
    this.#latinoChars = process.env.P_CRYPT_LATINO_CHARS || 'Qui totum vult totum perdit'
    this.#chineseChars = process.env.P_CRYPT_CHINESE_CHARS || '我了解了很多希腊的文化。'
    this.#turkishChars = process.env.P_CRYPT_TURKISH_CHARS || 'Geçmişte ne olduğun önemli değil, şu anda ne olduğun ve gelecekte ne olmak istediğin önemli'
    this.#swedishChars = process.env.P_CRYPT_SWEDISH_CHARS || 'Jag älskar dig av hela mitt hjärta och själ'
    this.___used = this.#withArgon ? 'argon2' : 'bcryptjs'
  }

  /**
   * use the crypto native module
   *
   * @param pwd passwrod value
   */
  #cryptoLayer(pwd: string): string {
    return createHash(this.#algorithm).update(pwd).digest('base64')
  }

  #getRange() {
    const secretsList: string[] = [
      this.#emojis,
      this.#secret,
      this.#specialChars,
      this.#arabicChars,
      this.#latinoChars,
      this.#chineseChars,
      this.#turkishChars,
      this.#swedishChars
    ]

    function uniqueArray(array): any[] {
      return Array.from(new Set(array))
    }
    
    function getSum(fromArray: number[]) {
      return fromArray.reduce((sum: number, next: number) => sum+=next, 0)
    }

    function toUniqueNumbers (fromStr: string, index: number) {
      const numbersListByChars = fromStr.split('').map((char) => char.charCodeAt(0))
      const numbersListBySingleChar = numbersListByChars.join('').split('')
      const sumChars = getSum(uniqueArray(numbersListByChars))
      const sumSingleChar = getSum(uniqueArray(numbersListBySingleChar))
      const uniqueNumber = '00' + index + sumChars + sumSingleChar
      return uniqueNumber
    }

    const range = secretsList.reduce((sum: number, s: string, i: number) => sum+=parseInt(toUniqueNumbers(s, i)), 0)
      
    return range
  }

  /**
   * use my private behave
   * 
   * @param pwd passwrod value
   */
  async #myPrivateLayer(pwd: string): Promise<string> {    
    // pwd here is hashed by the crypto method
    const step = Math.floor(pwd.length/3) + 1

    const firstPart = pwd.substring(0, step)
    const secondPart = pwd.substring(step, (step + step))
    const thirdPart = pwd.substring((step + step))

    const newCryptoLayer = `${firstPart}__קΠב૭ꍰ⡅ʆˣ${secondPart}ʬɮϠȹˢr--${this.#getRange()}ʘ˵ξॠ盫${thirdPart}s=${this.#secret}`
    
    const sixFirstCharUpdatedCrypto = newCryptoLayer.substring(0, 6)
    const restUpdatedCrypto = newCryptoLayer.substring(6)

    const crypted = sixFirstCharUpdatedCrypto
      .split('')
      .map(element => {
        const srcNum = `${(element.charCodeAt(0) * 45)}` // 1234
        const prefix = srcNum.substring(0, 1) // 1
        const midlix = srcNum.substring(1, 3) // 23
        const suffix = srcNum.substring(3, 4) // 4

        return `${prefix}${String.fromCharCode(+midlix)}${suffix}`
      })
      .toString() + restUpdatedCrypto
    
    return crypted
  }

  /**
   * use the bcryptjs module
   *
   * @param pwd passwrod value
   */
  async #bcryptLayer(pwd: string): Promise<string> {
    const salt = await genSalt(this.#saltSize)
    return await bcryptHash(pwd, salt) 
  }

  /**
   * use the argon2 module
   *
   * @param pwd passwrod value
   */
  async #argonLayer(pwd: string): Promise<string> {
    return await argonHash(pwd) 
  }

  /**
   * crypt the hash from a passed password
   */
  async hash(pwd: string): Promise<string> {
    const cryptoLayer = await this.#cryptoLayer(pwd)
    const touchLayer = await this.#myPrivateLayer(cryptoLayer)    
    const bcyptOrArgonLayer = await (this.#withArgon ? this.#argonLayer(touchLayer) : this.#bcryptLayer(touchLayer))
    return bcyptOrArgonLayer
  }

  /**
   * compare the old hashed password with new password
   */
  async compare(pwd: string, hash: string): Promise<boolean> {
    const cryptoLayer = await this.#cryptoLayer(pwd)
    const touchLayer = await this.#myPrivateLayer(cryptoLayer)
    const comparedResult = await (this.#withArgon ? verify(hash, touchLayer) : compare(touchLayer, hash))
    return comparedResult
  }
}

/**
 * Expose `PasswordCrypt`.
 */
export { PasswordCrypt }

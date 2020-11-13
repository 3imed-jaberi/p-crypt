// ################################
// #           Core Code          #
// ################################
import { createHash } from 'crypto' 
import { genSalt, hash, compare } from 'bcryptjs'

class PasswordCrypt {
  // All private attributes
  private password: string
  private hash: string
  private secret: string|number
  private __defaultConfig: string
  private __secret: string 
  private __head: string

  /**
   * constructor
   *
   * @param secret : private secret key for customize the crypto
   * @param password : passwrod value
   * @param hashPasword : result of crypto ancien password
   */
  constructor(
    secret : string|number,
    password: string,
    hashPasword?: string
  ) {
    this.password = password
    this.hash = hashPasword || ''
    this.secret = secret
    this.__defaultConfig = '*`~]^/°'
    this.__secret ='__LA_ILLAH_ILA_ALLAH__'
    this.__head = '$5C$1A$'
  }

  /**
   * use the crypto native nodejs module
   *
   * @param pwd passwrod value
   */
  private crypto(pwd: string): string {
    return createHash('sha512')
      .update(pwd)
      .digest('base64')
  }

  /**
   * use the bcryptjs module
   *
   * @param pwd passwrod value
   */
  private async bcrypt(pwd: string): Promise<string> {
    return await hash(pwd, await genSalt(10)) 
  }

  // anonymous funcs ... <imed />
  private async touch(): Promise<string> {
    const initCrypto: string = await this.crypto(this.password)
    const firstPart = initCrypto.substring(0, 20)
    const secondPart = initCrypto.substring(20, 50)
    const thirdPart = initCrypto.substring(50)

    const updatedCrypto = `${this.__head}*${this.__secret}*@ç_à%|${firstPart}${this.__defaultConfig}${secondPart}${this.secret}${thirdPart}*`          
    const sixFirstCharUpdatedCrypto = updatedCrypto.substring(0, 6)
    const restUpdatedCrypto = updatedCrypto.substring(6)
     
    return (
      sixFirstCharUpdatedCrypto
        .split('')
        .map(element => {
          const srcNum = `${(element.charCodeAt(0) * 45)}` // 1234
          const prefix = srcNum.substring(0, 1) // 1
          const midlix = srcNum.substring(1, 3) // 23
          const suffix = srcNum.substring(3, 4) // 4

          return `${prefix}${String.fromCharCode(+midlix)}${suffix}`
        })
        .toString() + restUpdatedCrypto
    )
  }

  // use my touch for crypto password
  public async pcrypt(): Promise<string> {
    return await this.bcrypt(await this.touch())
  }

  /**
   * use the bcryptjs module for compare the
   * old hashed pwd (bcrypt pwd) with new pwd
   *  
   * @param pwd passwrod value
   */
  private compare_bcrypt(pwd: string): Promise<boolean> {
    return compare(pwd, this.hash)
  } 

  /**
   * compare the old hashed password (my touch)
   * with new password
   */
  public async compare_pcrypt(): Promise<boolean> {
    return this.compare_bcrypt(await this.touch())
  }
}

// ################################
// #             Export           #
// ################################

/**
 * Crypto password
 *
 * @param secret  private secret key for customize the crypto
 * @param password  passwrod value
 */
export async function Crypt(secret: string|number, password: string): Promise<string> {
  return await new PasswordCrypt(secret, password).pcrypt()
}

/**
 * Compare the old crypto pasword with the new for check
 * 
 * @param secret  private secret key for customize the crypto
 * @param password  passwrod value
 * @param hash  result of crypto ancien password
 */
export async function Compare(secret: string|number, password: string, hash: string): Promise<boolean> {
  return await new PasswordCrypt(secret, password, hash).compare_pcrypt()
}

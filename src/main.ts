import { createHash } from 'crypto' ;
import { genSalt , hash , compare } from 'bcryptjs';



class PasswordCrypt {

  /**
   * All Private Attributes .. 
   */
  private password: string;
  private hash: string;
  private Secret: string|number;
  private __Config_Data__: string;
  private FounderSecret: string ;
  private myHead: string;


  /**
   * 
   * @param Secret : private secret key for customize the crypto .. 
   * @param Password : the passwrod value .. 
   * @param hashPasword : the result of crypto ancien password ..  
   */
  constructor(Secret : string|number, Password :string, hashPasword ?: string ) {
    this.password = Password ;
    this.hash = hashPasword || '' ;
    this.Secret = Secret ;
    this.__Config_Data__ = '*`~]^/°';
    this.FounderSecret ='__LA_ILLAH_ILA_ALLAH__';
    this.myHead = "$5C$1A$";
  }


  /**
   * use the crypto native nodejs module for crypto the password ..
   * @param password : the passwrod value .. 
   */
  private crypto(password:string): string {
    return createHash('sha512').update(password).digest('base64');
  }


  /**
   * use the bcryptjs module for crypto the password .. 
   * @param password : the passwrod value ..  
   */
  private async bcrypt(password:string): Promise<string> {
    return await hash(password,await genSalt(10)); 
  }


  /**
  * anonymous funcs ... <imed /> 
  */
  private async touch(): Promise<string> {

    let crypto: string = await this.crypto(this.password);

    // step 1 .. 
    crypto = `${this.myHead}*${this.FounderSecret}*@ç_à%|${crypto.substring(0, 20)}${this.__Config_Data__}${crypto.substring(20, 50)}${this.Secret}${crypto.substring(50)}*`;          
    // step 2 ..     
    let preR: string = crypto.substring(0, 6).split('').map((element: string) => {
      let genSoureNumber: string = `${(element.charCodeAt(0) * 45)}`;
      return `${genSoureNumber.substring(0, 1)}${String.fromCharCode(+genSoureNumber.substring(1, 3))}${genSoureNumber.substring(3, 4)}`;
    }).toString() + crypto.substring(6);   
        
    return preR;
  }


  /**
   * use my touch for crypto the password .. 
   */
  public async pcrypt(): Promise<string> {
    return await this.bcrypt(await this.touch());
  }


  /**
   * use the bcryptjs module for compare the old hashed password ( bcrypt password ) with new password .. 
   * @param password : the passwrod value ..  
   */
  private compare_bcrypt(password: string): Promise<boolean> {
    return compare(password, this.hash);
  } 


  /**
   * compare the old hashed password ( my touch ) with new password .. 
   */
  public async compare_pcrypt(): Promise<boolean> {
    return this.compare_bcrypt(await this.touch());
  }
}


export default PasswordCrypt;
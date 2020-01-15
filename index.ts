import PasswordCrypt from './src/main';


/**
 * Crypto the password .. 
 * @param Secret : private secret key for customize the crypto .. 
 * @param Password : the passwrod value .. 
 */
export async function Crypt(Secret: string|number, Password: string): Promise<string> {
  return await new PasswordCrypt(Secret, Password).pcrypt();
};


/**
 * Compare the old crypto pasword with the new for check .... 
 * @param Secret : private secret key for customize the crypto .. 
 * @param Password : the passwrod value .. 
 * @param Hash : the result of crypto ancien password ..  
*/
export async function Compare(Secret: string|number, Password: string, Hash: string): Promise<boolean> {
  return await new PasswordCrypt(Secret, Password, Hash).compare_pcrypt();
};
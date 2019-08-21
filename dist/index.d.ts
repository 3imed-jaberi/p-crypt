/**
 * crypto the password ..
 * @param Secret : private secret key for customize the crypto ..
 * @param Password : the passwrod value ..
 */
export declare function Crypt(Secret: string | number, Password: string): Promise<string>;
/**
 * compare the old crypto pasword with the new for check ....
 * @param Secret : private secret key for customize the crypto ..
 * @param Password : the passwrod value ..
 * @param Hash : the result of crypto ancien password ..
 */
export declare function Compare(Secret: string | number, Password: string, Hash: string): Promise<boolean>;

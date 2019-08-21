declare class PasswordCrypt {
    /**
     * All Private Attributes ..
     */
    private password;
    private hash;
    private Secret;
    private __Config_Data__;
    private FounderSecret;
    private myHead;
    /**
     *
     * @param Secret : private secret key for customize the crypto ..
     * @param Password : the passwrod value ..
     * @param hashPasword : the result of crypto ancien password ..
     */
    constructor(Secret: string | number, Password: string, hashPasword?: string);
    /**
     * use the crypto native nodejs module for crypto the password ..
     * @param password : the passwrod value ..
     */
    private crypto;
    /**
     * use the bcryptjs module for crypto the password ..
     * @param password : the passwrod value ..
     */
    private bcrypt;
    /**
     * anonymous funcs ... <imed />
     */
    private touch;
    /**
     * use my touch for crypto the password ..
     */
    pcrypt(): Promise<string>;
    /**
     * use the crypto native nodejs module for compare the old hashed password ( crypto password ) with new password ..
     */
    /**
     * use the bcryptjs module for compare the old hashed password ( bcrypt password ) with new password ..
     * @param password : the passwrod value ..
     */
    private compare_bcrypt;
    /**
     * compare the old hashed password ( my touch ) with new password ..
     */
    compare_pcrypt(): Promise<boolean>;
}
export default PasswordCrypt;

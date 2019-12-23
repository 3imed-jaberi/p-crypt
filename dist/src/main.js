"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const bcryptjs_1 = require("bcryptjs");
class PasswordCrypt {
    /**
     *
     * @param Secret : private secret key for customize the crypto ..
     * @param Password : the passwrod value ..
     * @param hashPasword : the result of crypto ancien password ..
     */
    constructor(Secret, Password, hashPasword) {
        this.password = Password;
        this.hash = hashPasword || '';
        this.Secret = Secret;
        this.__Config_Data__ = '*`~]^/°';
        this.FounderSecret = '__LA_ILLAH_ILA_ALLAH__';
        this.myHead = "$5C$1A$";
    }
    /**
     * use the crypto native nodejs module for crypto the password ..
     * @param password : the passwrod value ..
     */
    crypto(password) {
        return crypto_1.createHash('sha512').update(password).digest('base64');
    }
    /**
     * use the bcryptjs module for crypto the password ..
     * @param password : the passwrod value ..
     */
    bcrypt(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.hash(password, yield bcryptjs_1.genSalt(10));
        });
    }
    /**
     * anonymous funcs ... <imed />
     */
    touch() {
        return __awaiter(this, void 0, void 0, function* () {
            let crypto = yield this.crypto(this.password);
            // step 1 .. 
            crypto = this.myHead + "*" + this.FounderSecret + "*@ç_à%|" + crypto.substring(0, 20) + this.__Config_Data__ + crypto.substring(20, 50) + this.Secret + crypto.substring(50) + "*";
            // step 2 ..     
            let preR = crypto.substring(0, 6).split('').map((element) => {
                let genSoureNumber = (element.charCodeAt(0) * 45).toString();
                return genSoureNumber.substring(0, 1) + String.fromCharCode(parseInt(genSoureNumber.substring(1, 3))) + genSoureNumber.substring(3, 4);
            }).toString() + crypto.substring(6);
            return preR;
        });
    }
    /**
     * use my touch for crypto the password ..
     */
    pcrypt() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.bcrypt(yield this.touch());
            return result;
        });
    }
    /**
     * use the crypto native nodejs module for compare the old hashed password ( crypto password ) with new password ..
     */
    // private compare_crypto(password:string):boolean{
    //        return createHash('sha512').update(password).digest('base64') === this.LocalHash ;
    // }
    /**
     * use the bcryptjs module for compare the old hashed password ( bcrypt password ) with new password ..
     * @param password : the passwrod value ..
     */
    compare_bcrypt(password) {
        return bcryptjs_1.compare(password, this.hash);
    }
    /**
     * compare the old hashed password ( my touch ) with new password ..
     */
    compare_pcrypt() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.compare_bcrypt(yield this.touch());
        });
    }
}
exports.default = PasswordCrypt;

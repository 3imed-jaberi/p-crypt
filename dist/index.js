"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./src/main");
/**
 * crypto the password ..
 * @param Secret : private secret key for customize the crypto ..
 * @param Password : the passwrod value ..
 */
function Crypt(Secret, Password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new main_1.default(Secret, Password).pcrypt();
    });
}
exports.Crypt = Crypt;
;
/**
 * compare the old crypto pasword with the new for check ....
 * @param Secret : private secret key for customize the crypto ..
 * @param Password : the passwrod value ..
 * @param Hash : the result of crypto ancien password ..
 */
function Compare(Secret, Password, Hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new main_1.default(Secret, Password, Hash).compare_pcrypt();
    });
}
exports.Compare = Compare;
;

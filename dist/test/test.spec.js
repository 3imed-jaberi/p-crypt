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
require("mocha");
const chai_1 = require("chai");
const index_1 = require("../index");
describe('unit test using ` mocha ☕️ ` & ` chai 🍵 ` is running 👻 ..', () => {
    let Password = 'Imed Jaberi', Secret = 'SomeSecret', Hash = '$2a$10$58t0eKJocSAok2bIAcztSe3pU7fuuF9P72c1ZIUsIX84WCKEuZPIi';
    it('Check the new password with the old ..', () => __awaiter(void 0, void 0, void 0, function* () {
        chai_1.expect(yield index_1.Compare(Secret, Password, Hash)).to.be.true;
    }));
    it('Generate the hash code ..', () => __awaiter(void 0, void 0, void 0, function* () {
        chai_1.expect(yield index_1.Crypt(Secret, Password)).to.not.equal(Password);
    }));
});

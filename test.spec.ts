import 'mocha';
import { expect } from 'chai';
import { Compare, Crypt } from '.';


describe('unit test using ` mocha ☕️ ` & ` chai 🍵 ` is running 👻 ..', () => {

  let Password: string = 'Imed Jaberi', Secret: string|number = 'SomeSecret';

  it('Compare Test ..', async () => {
    let HashedPassword = await Crypt(Secret, Password);
    expect(await Compare(Secret, Password, HashedPassword)).to.be.true;
  });

  it('Crypt Test ..', async () => {
    (expect(await Crypt(Secret, Password)).to.not.equal(await Crypt(Secret, Password)) &&
    expect(await Crypt(Secret, Password)).to.not.equal(Password));
  });

});
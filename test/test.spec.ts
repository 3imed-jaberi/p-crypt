import 'mocha';
import { expect } from 'chai';
import { Compare, Crypt } from '../index';



describe('unit test using ` mocha ☕️ ` & ` chai 🍵 ` is running 👻 ..', () => {

  let Password: string = 'Imed Jaberi', Secret: string|number = 'SomeSecret', Hash: string = '$2a$10$58t0eKJocSAok2bIAcztSe3pU7fuuF9P72c1ZIUsIX84WCKEuZPIi';

  it('Check the new password with the old ..', async () => {
    expect(await Compare(Secret, Password, Hash)).to.be.true;
  });

  it('Generate the hash code ..', async () => {
    expect(await Crypt(Secret, Password)).to.not.equal(Password);
  });
});
import { expect } from 'chai';
import { Compare } from '../index';

describe('unit test using ` mocha ☕️ ` & ` chai 🍵 ` is running 👻 ..', () => {

  let Password : string = "Imed Jaberi" , Secret : string | number = "SomeSecret", Hash : string = "$2a$10$58t0eKJocSAok2bIAcztSe3pU7fuuF9P72c1ZIUsIX84WCKEuZPIi" ;

  // the gen. hash func is alawas <> ... 
  it('Check the new password with the old ..', async () => {
   expect(await Compare(Secret,Password,Hash)).to.be.true;
  });

});

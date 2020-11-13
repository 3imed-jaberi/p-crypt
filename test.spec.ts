import 'mocha'
import { expect } from 'chai'
import { Compare, Crypt } from '.'


describe('unit test using ` mocha ☕️ ` & ` chai 🍵 ` is running 👻 ..', () => {
  const password = 'Imed Jaberi'
  const secret = 'SomeSecret'

  it('Compare Test ..', async () => {
    expect(await Compare(
      secret,
      password,
      await Crypt(secret, password)
    )).to.be.true
  })

  it('Crypt Test ..', async () => {
    expect(await Crypt(secret,password))
    .to.not.equal(await Crypt(secret, password)) &&
    expect(await Crypt(secret, password)).to.not.equal(password)
  })
})

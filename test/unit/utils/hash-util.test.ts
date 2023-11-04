import * as bcrypt from 'bcrypt';
describe('Hash util', () => {
  it('Should generate a salt when called.', async () => {
    const salt = await bcrypt.genSalt();

    console.log(salt);
  });
});

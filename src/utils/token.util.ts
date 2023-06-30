import bcrypt from 'bcrypt';

const token = {
  async hashPassword(password: string) {
    return await bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  async comparePasswords(candidatePassword: string, userPassword: string) {
    const isMatch = await bcrypt.compare(candidatePassword, userPassword);
    return isMatch;
  },
};

export default token;
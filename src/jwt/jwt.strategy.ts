import jwt from 'jsonwebtoken';
import { AuthRoot } from 'authRoot';

const jwtToken = {
  async signToken(authUser: AuthRoot) {
    const token = jwt.sign({ id: authUser.id?.toString() }, `${process.env.AccessTokenKey}`, {
      expiresIn: `${process.env.accessTokenExpiresIn}m`,
    });
    return token;
  },
};

export default jwtToken;
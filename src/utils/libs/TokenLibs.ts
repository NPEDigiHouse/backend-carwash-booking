import jwt from 'jsonwebtoken';

interface IJWTTokenTypes {
  payload: {};
  secretKey: jwt.Secret;
  options?: jwt.SignOptions | undefined;
}

interface IJWTVerifyToken {
  item: string;
  secretKey: jwt.Secret;
}

class TokenLibs {
  async signToken({ payload, secretKey, options }: IJWTTokenTypes) {
    const token = jwt.sign(payload, secretKey);

    return token;
  }

  async verifyToken({ item, secretKey }: IJWTVerifyToken) {
    const token = jwt.verify(item, secretKey);

    return token;
  }
}

export const TokenLibsUtils = new TokenLibs();

import bcrypt from 'bcrypt';

class BcryptLibs {
  async hashBcrypt(cryptText: string) {
    const hashItem = await bcrypt.hash(cryptText, 10);

    return hashItem;
  }

  async compareBcrypt(item1: string, item2: string) {
    const compareItem = await bcrypt.compare(item1, item2);

    return compareItem;
  }
}

export const BcryptLibsUtil = new BcryptLibs();

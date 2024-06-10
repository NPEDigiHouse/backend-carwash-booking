import bcrypt from 'bcrypt';
import { BcryptLibsUtil } from '../src/utils/libs/BcryptLibs';
import prisma from '../src/config/database';

async function main() {
  const initialPassword = 'wulingbandung';

  const hashPassword = await BcryptLibsUtil.hashBcrypt(initialPassword);

  const user = await prisma.user.create({
    data: {
      email: 'adminwulingcar@gmail.com',
      password: hashPassword,
      username: 'wuling',
      role: 'ADMIN',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

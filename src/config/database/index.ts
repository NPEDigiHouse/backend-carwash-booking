// import { PrismaDB } from './DBConfig';

// const connectDatabase = () => {
//   PrismaDB.load();
// };

// export default connectDatabase();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

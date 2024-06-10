import { PrismaClient } from '@prisma/client';

class PrismaConfig {
  db: PrismaClient | null;

  load() {
    this.db = new PrismaClient();
  }
}

export const PrismaDB = new PrismaConfig();

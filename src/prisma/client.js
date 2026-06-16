const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

console.log(
  'Prisma Client Loaded:',
  prisma._runtimeDataModel?.models?.Blog
);

module.exports = prisma;
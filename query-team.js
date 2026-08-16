const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const team = await prisma.teamMember.findMany();
  console.log(JSON.stringify(team, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

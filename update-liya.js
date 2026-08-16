const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const name = "Liyakathali K T";
  
  // Find if exists
  const existing = await prisma.teamMember.findFirst({
    where: { name: { contains: "Liyakathali" } }
  });

  if (existing) {
    console.log("Found existing:", existing);
    const updated = await prisma.teamMember.update({
      where: { id: existing.id },
      data: { image: "/images/liyakathali.jpg" }
    });
    console.log("Updated:", updated);
  } else {
    console.log("Not found. Creating new.");
    const created = await prisma.teamMember.create({
      data: {
        name: name,
        role: "Team Member", // Just a fallback, hopefully not needed
        bio: "Loopernode Team Member",
        image: "/images/liyakathali.jpg",
        order: 1
      }
    });
    console.log("Created:", created);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

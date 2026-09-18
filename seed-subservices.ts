import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { dataCollectionServices } from "./content/services/data-collection";
import { dataLabelingServices } from "./content/services/data-labeling";
import { dataProcessingServices } from "./content/services/data-processing";

const url = "postgresql://postgres.ujinbguynwrhswzkwqtj:Loopernode%401996@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1";
const adapter = new PrismaPg({ connectionString: url });
const prisma = new PrismaClient({ adapter });

async function main() {
  const allSubServices = [
    ...dataCollectionServices,
    ...dataLabelingServices,
    ...dataProcessingServices
  ];

  console.log(`Found ${allSubServices.length} sub-services to seed.`);

  for (let i = 0; i < allSubServices.length; i++) {
    const s = allSubServices[i];
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        category: s.category,
        description: s.description,
        longDescription: s.longDescription,
        icon: s.icon,
        features: JSON.stringify(s.features),
        benefits: s.benefits ? JSON.stringify(s.benefits) : null,
        useCases: s.useCases ? JSON.stringify(s.useCases) : null,
        order: i
      },
      create: {
        title: s.title,
        slug: s.slug,
        category: s.category,
        description: s.description,
        longDescription: s.longDescription,
        icon: s.icon,
        features: JSON.stringify(s.features),
        benefits: s.benefits ? JSON.stringify(s.benefits) : null,
        useCases: s.useCases ? JSON.stringify(s.useCases) : null,
        order: i
      }
    });
  }

  console.log("Sub-services seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

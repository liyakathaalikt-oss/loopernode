import prisma from '../lib/prisma';
import { teamMembers } from '../content/team';
import { blogPosts } from '../content/blog-posts';
import { caseStudies } from '../content/case-studies';
import { homeFAQs, contactFAQs, dataCollectionFAQs, dataLabelingFAQs, dataProcessingFAQs } from '../content/faqs';
import { testimonials } from '../content/testimonials';

async function main() {
  console.log('Starting content migration to Neon database...');

  // ... (other migrations already ran, but we can safely let them run again because of unique checks) ...

  // --- FAQS ---
  console.log('Migrating FAQs...');
  const allFaqCategories = [
    { category: 'Home', items: homeFAQs },
    { category: 'Contact', items: contactFAQs },
    { category: 'Data Collection', items: dataCollectionFAQs },
    { category: 'Data Labeling', items: dataLabelingFAQs },
    { category: 'Data Processing', items: dataProcessingFAQs }
  ];

  let faqOrder = 0;
  for (const category of allFaqCategories) {
    for (const item of category.items) {
      const existing = await prisma.faq.findFirst({ where: { question: item.question } });
      if (!existing) {
        await prisma.faq.create({
          data: {
            question: item.question,
            answer: item.answer,
            category: category.category,
            order: faqOrder++,
          }
        });
      }
    }
  }
  console.log(`✅ Migrated FAQs.`);

  // --- TESTIMONIALS ---
  console.log('Migrating Testimonials...');
  for (let i = 0; i < testimonials.length; i++) {
    const test = testimonials[i];
    const existing = await prisma.testimonial.findFirst({ where: { clientName: test.author } });
    if (!existing) {
      await prisma.testimonial.create({
        data: {
          clientName: test.author,
          clientRole: test.role,
          company: test.company,
          content: test.quote,
          image: null,
          order: i,
        }
      });
    }
  }
  console.log(`✅ Migrated ${testimonials.length} testimonials.`);

  console.log('Migration complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

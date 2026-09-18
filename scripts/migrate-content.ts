import 'dotenv/config';
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

  // --- TEAM MEMBERS ---
  console.log('Migrating Team Members...');
  for (let i = 0; i < teamMembers.length; i++) {
    const member = teamMembers[i];
    const existing = await prisma.teamMember.findFirst({ where: { name: member.name } });
    if (!existing) {
      await prisma.teamMember.create({
        data: {
          name: member.name,
          role: member.role,
          bio: member.bio,
          image: member.image,
          linkedinUrl: member.linkedinUrl,
          order: i,
        }
      });
    }
  }
  console.log(`✅ Migrated ${teamMembers.length} team members.`);

  // --- BLOG POSTS ---
  console.log('Migrating Blog Posts...');
  for (const post of blogPosts) {
    const existing = await prisma.blogPost.findFirst({ where: { slug: post.slug } });
    if (!existing) {
      await prisma.blogPost.create({
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content || 'Placeholder content',
          coverImage: post.image,
          author: post.author?.name || 'Loopernode Team',
          category: post.category,
          tags: JSON.stringify(post.tags || []),
          published: true,
          seoTitle: post.title,
          seoDesc: post.excerpt,
        }
      });
    }
  }
  console.log(`✅ Migrated ${blogPosts.length} blog posts.`);

  // --- CASE STUDIES ---
  console.log('Migrating Case Studies...');
  for (const study of caseStudies) {
    const existing = await prisma.caseStudy.findFirst({ where: { slug: study.slug } });
    if (!existing) {
      await prisma.caseStudy.create({
        data: {
          title: study.title,
          slug: study.slug,
          client: study.client,
          industry: study.industry,
          challenge: study.challenge,
          solution: study.solution,
          results: JSON.stringify(study.results || []),
          image: study.image,
        }
      });
    }
  }
  console.log(`✅ Migrated ${caseStudies.length} case studies.`);

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

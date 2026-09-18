const { Client } = require('pg');
require('dotenv').config();
async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const res = await client.query('SELECT title, "seoTitle", "seoDesc" FROM "BlogPost" WHERE "seoTitle" IS NULL OR "seoDesc" IS NULL;');
  console.log('Blog Posts missing metadata:', res.rows.map(r => r.title));
  
  const res2 = await client.query('SELECT title, "seoTitle", "seoDesc" FROM "CaseStudy" WHERE "seoTitle" IS NULL OR "seoDesc" IS NULL;');
  console.log('Case Studies missing metadata:', res2.rows.map(r => r.title));
  await client.end();
}
run().catch(console.error);

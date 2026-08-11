const fs = require('fs');
const path = require('path');

const files = [
  'app/page.tsx', 
  'app/about/page.tsx',
  'app/blog/page.tsx',
  'app/blog/[slug]/page.tsx',
  'app/case-studies/page.tsx',
  'app/case-studies/[slug]/page.tsx',
  'app/careers/page.tsx',
  'app/careers/[slug]/page.tsx',
  'app/services/page.tsx',
  'app/contact/page.tsx'
];

for (const file of files) {
  const fullPath = path.join(__dirname, '..', file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if already has revalidate or dynamic
    if (!content.includes('export const revalidate') && !content.includes('export const dynamic = "force-dynamic"')) {
      // Find the first export statement or function
      const exportIndex = content.indexOf('export default');
      if (exportIndex !== -1) {
        content = content.slice(0, exportIndex) + '\nexport const revalidate = 0;\n// Opt out of Next.js static caching to ensure CMS updates are instant\n\n' + content.slice(exportIndex);
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${file}`);
      }
    } else {
      console.log(`Skipped ${file} (already has dynamic config)`);
    }
  }
}

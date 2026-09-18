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
    
    // 1. Remove revalidate = 0 if it exists
    content = content.replace(/export const revalidate = 0;\n\/\/ Opt out of Next.js static caching to ensure CMS updates are instant\n\n/g, '');
    content = content.replace(/export const revalidate = 0;\n/g, '');
    content = content.replace(/export const revalidate = 0;/g, '');
    
    // 2. Add dynamic = "force-dynamic"
    if (!content.includes('export const dynamic')) {
      const exportIndex = content.indexOf('export default');
      if (exportIndex !== -1) {
        content = content.slice(0, exportIndex) + 'export const dynamic = "force-dynamic";\n\n' + content.slice(exportIndex);
      }
    }
    
    // 3. Remove generateStaticParams block completely using regex
    // This regex looks for export async function generateStaticParams() { ... }
    // It assumes balanced curly braces but for our simple files a non-greedy match up to the next export is safer.
    content = content.replace(/export async function generateStaticParams\(\) \{[\s\S]*?\n\}\n/g, '');
    
    // Some files might have slightly different formatting for generateStaticParams, let's catch them
    content = content.replace(/export function generateStaticParams\(\) \{[\s\S]*?\n\}\n/g, '');
    
    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
}

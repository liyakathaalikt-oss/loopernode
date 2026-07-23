const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\liyak\\.gemini\\antigravity\\scratch\\novamind-ai';
const files = [
  'app/layout.tsx',
  'app/page.tsx',
  'app/about/page.tsx',
  'app/blog/page.tsx',
  'app/blog/[slug]/page.tsx',
  'app/contact/page.tsx',
  'app/not-found.tsx',
  'app/services/page.tsx',
  'app/services/data-collection/page.tsx',
  'app/services/data-collection/[slug]/page.tsx',
  'app/services/data-labeling/page.tsx',
  'app/services/data-labeling/[slug]/page.tsx',
  'app/services/data-processing/page.tsx',
  'app/services/data-processing/[slug]/page.tsx',
  'app/robots.ts',
  'app/sitemap.ts',
  'components/layout/header.tsx',
  'components/layout/footer.tsx',
  'components/layout/mobile-nav.tsx',
  'components/layout/breadcrumb.tsx',
  'components/ui/cookie-consent.tsx',
  'content/case-studies.ts',
  'content/faqs.ts',
  'content/team.ts',
  'content/testimonials.ts',
  'lib/metadata.ts',
  'lib/schema.ts',
  'package.json'
];

const logoRegex = /NovaMind\s*<span([^>]*)>AI<\/span>/g;
const logoReplacement = 'Looper<span$1>node</span>';

const rules = [
  { from: /NovaMind AI/g, to: 'Loopernode' },
  { from: /NovaMind's/g, to: 'Loopernode\'s' },
  { from: /NovaMind/g, to: 'Loopernode' },
  { from: /novamind-ai\.com/g, to: 'loopernode.com' },
  { from: /novamind-ai/g, to: 'loopernode' },
  { from: /novamind\.ai/g, to: 'loopernode.com' },
  { from: /@novamindai/g, to: '@loopernode' },
  { from: /novamindai/g, to: 'loopernode' },
  { from: /novamind/g, to: 'loopernode' }
];

for (const relPath of files) {
  const fullPath = path.join(baseDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log('Skipping ' + relPath + ' - does not exist.');
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let newContent = content;
  
  if (['components/layout/header.tsx', 'components/layout/footer.tsx', 'components/layout/mobile-nav.tsx'].includes(relPath)) {
    newContent = newContent.replace(logoRegex, logoReplacement);
  }
  
  for (const rule of rules) {
    newContent = newContent.replace(rule.from, rule.to);
  }
  
  if (content !== newContent) {
    fs.writeFileSync(fullPath, newContent, 'utf8');
    console.log('Updated ' + relPath);
  }
}

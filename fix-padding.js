const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('page.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const pages = walk(path.join(__dirname, 'app'));

pages.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('<Hero') || content.includes('<ScrollBorderSection')) {
    let newContent = content.replace(/className="pt-20 md:pt-28 pb-10/g, 'className="pb-10');
    newContent = newContent.replace(/className="pt-20 md:pt-28/g, 'className="');
    
    if (newContent !== content) {
      fs.writeFileSync(file, newContent);
      console.log('Fixed', file);
    }
  }
});

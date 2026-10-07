const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== 'out' && file !== '.git') {
        results = results.concat(walk(full));
      }
    } else if (file.endsWith('.json') || file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(/images\/[^\s"'`]+/g);
      if (matches) {
        results.push({ file: full, matches: Array.from(new Set(matches)) });
      }
    }
  });
  return results;
}

const found = walk('.');
console.log(JSON.stringify(found, null, 2));

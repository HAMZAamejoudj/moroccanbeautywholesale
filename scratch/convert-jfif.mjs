import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'images');
const files = fs.readdirSync(dir);

let count = 0;
for (const file of files) {
  if (file.toLowerCase().endsWith('.jfif')) {
    const oldPath = path.join(dir, file);
    const newName = file.replace(/\.jfif$/i, '.jpg');
    const newPath = path.join(dir, newName);
    
    fs.copyFileSync(oldPath, newPath);
    fs.unlinkSync(oldPath);
    console.log(`Renamed: ${file} -> ${newName} (${fs.statSync(newPath).size} bytes)`);
    count++;
  }
}

console.log(`Total converted: ${count}`);

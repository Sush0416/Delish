const fs = require('fs');
const path = require('path');

function printDir(dir, prefix = '', level = 0, maxLevel = 3) {
  if (level > maxLevel) return;
  const files = fs.readdirSync(dir);
  files.forEach((file, index) => {
    const fullPath = path.join(dir, file);
    const isDir = fs.statSync(fullPath).isDirectory();
    const connector = index === files.length - 1 ? '└── ' : '├── ';
    console.log(prefix + connector + file);
    if (isDir) {
      const newPrefix = prefix + (index === files.length - 1 ? '    ' : '│   ');
      printDir(fullPath, newPrefix, level + 1, maxLevel);
    }
  });
}

// Run from current directory
printDir(process.cwd());

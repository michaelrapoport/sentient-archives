const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const owner = 'michaelrapoport';
const repo = 'sentient-archives';

function getFiles(dir, allFiles = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      if (file !== '.git' && file !== 'node_modules') {
        getFiles(name, allFiles);
      }
    } else {
      allFiles.push(name);
    }
  }
  return allFiles;
}

const rootDir = process.cwd();
const files = getFiles(rootDir);

for (const filePath of files) {
  const relativePath = path.relative(rootDir, filePath).split(path.sep).join('/');
  if (relativePath === 'upload.js' || relativePath === '.git' || relativePath.startsWith('.git/')) continue;
  
  console.log(`Uploading ${relativePath}...`);
  const content = fs.readFileSync(filePath, { encoding: 'base64' });
  const message = `Add ${relativePath}`;
  
  try {
    const cmd = `gh api -X PUT /repos/${owner}/${repo}/contents/${relativePath} -f message="${message}" -f content="${content}"`;
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed to upload ${relativePath}: ${err.message}`);
  }
}
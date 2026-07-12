const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const regex = /path\.join\(__dirname,.*?\),?\n?/g;
content = content.replace(regex, '');

fs.writeFileSync('server.ts', content);

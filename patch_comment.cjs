const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const replacement = `
    const { zipCode, franchise, ageCategory, accident } = req.query;
    console.log("[Priminfo API] Processing proxy request for Swiss open data...");
`;

content = content.replace('const { zipCode, franchise, ageCategory, accident } = req.query;', replacement.trim());

fs.writeFileSync('server.ts', content);

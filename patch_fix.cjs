const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

// The file has two `let premiumsDb: Record...`
content = content.replace(/let premiumsDb: Record<string, \{ premium: number; modelName: string \}> = \{\};\n\nlet premiumsDb: Record<string, \{ premium: number; modelName: string \}> = \{\};/, "let premiumsDb: Record<string, { premium: number; modelName: string }> = {};");
// Also if there's any stray one
content = content.replace(/let premiumsDb: Record<string, \{ premium: number; modelName: string \}> = \{\};\s*let premiumsDb: Record<string, \{ premium: number; modelName: string \}> = \{\};/, "let premiumsDb: Record<string, { premium: number; modelName: string }> = {};");

fs.writeFileSync('server.ts', content);

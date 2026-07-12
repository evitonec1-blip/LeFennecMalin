const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

// Replace the loadPremiums paths with a more robust version including ESM __dirname
const replacement = `
import { fileURLToPath } from 'url';

// Use a safe way to get dirname in case it's ESM
const getDirname = () => {
  try {
    if (typeof __dirname !== 'undefined') return __dirname;
    return path.dirname(fileURLToPath(import.meta.url));
  } catch (e) {
    return process.cwd();
  }
};

const robustPathsToTry = () => {
  const dir = getDirname();
  const cwd = process.cwd();
  return [
    path.join(cwd, "public", "premiums_2026.json"),
    path.join(cwd, "dist", "premiums_2026.json"),
    path.join(cwd, "premiums_2026.json"),
    path.join(dir, "public", "premiums_2026.json"),
    path.join(dir, "..", "public", "premiums_2026.json"),
    path.join(dir, "premiums_2026.json")
  ];
};

function loadPremiums() {
  if (Object.keys(premiumsDb).length > 0) return premiumsDb;

  try {
    const pathsToTry = robustPathsToTry();

    let loaded = false;
    for (const dbPath of pathsToTry) {
      if (fs.existsSync(dbPath)) {
        console.log(\`[Server] Loading local official 2026 premiums database from \${dbPath}...\`);
        const fileContent = fs.readFileSync(dbPath, "utf-8");
        if (fileContent && fileContent.length > 0) {
           premiumsDb = JSON.parse(fileContent);
           console.log(\`[Server] Successfully loaded \${Object.keys(premiumsDb).length} premium records.\`);
           loaded = true;
           break;
        }
      }
    }
    
    if (!loaded) {
      console.warn("[Server] WARNING: Local premiums database not found in any of the expected locations.");
    }
  } catch (err) {
    console.error("[Server] Error loading local premiums database:", err);
  }
  return premiumsDb;
}
`;

content = content.replace(/function loadPremiums\(\) \{[\s\S]*?return premiumsDb;\n\}/, replacement.trim());
content = content.replace('const pathsToTry = [', ''); // remove old pathsToTry just in case
content = content.replace(/path\.join\(process\.cwd\(\), "public", "premiums_2026\.json"\),\n\s*path\.join\(process\.cwd\(\), "dist", "premiums_2026\.json"\),\n\s*\];/, '');

fs.writeFileSync('server.ts', content);

const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const newLoading = `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let premiumsDb: Record<string, { premium: number; modelName: string }> = {};

function loadPremiums() {
  if (Object.keys(premiumsDb).length > 0) return premiumsDb;
  try {
    console.log("[Server] Loading local official 2026 premiums database via require()...");
    const data = require('./public/premiums_2026.json');
    premiumsDb = data;
    console.log(\`[Server] Successfully loaded \${Object.keys(premiumsDb).length} premium records.\`);
  } catch (err) {
    console.error("[Server] Error loading local premiums database via require:", err);
  }
  return premiumsDb;
}
`;

content = content.replace(/import \{ fileURLToPath \} from 'url';[\s\S]*?return premiumsDb;\n\}/, newLoading.trim());

fs.writeFileSync('server.ts', content);

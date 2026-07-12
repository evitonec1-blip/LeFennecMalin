const fs = require('fs');
let content = fs.readFileSync('src/services/priminfoService.ts', 'utf-8');

// We remove the fallback entirely
content = content.replace(/try \{\n\s*if \(\!clientPremiumsDbCache\) \{[\s\S]*?\/\/ If all else fails, return an empty array \(which will trigger formulaic calculators in components\)/, '// Fallback disabled: we rely on the robust backend API.\n\n    // If all else fails, return an empty array (which will trigger formulaic calculators in components)');

fs.writeFileSync('src/services/priminfoService.ts', content);

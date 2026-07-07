import fs from 'fs';
import path from 'path';

const INSURER_MAP = {
  '32': 'assura',
  '1384': 'css',
  '1562': 'helsana',
  '290': 'swica',
  '1568': 'visana',
  '1555': 'visana',
  '1386': 'visana',
  '1509': 'sanitas',
  '312': 'concordia',
  '376': 'kpt',
  '1542': 'mutuel',
  '1479': 'mutuel',
  '1507': 'mutuel',
  '1535': 'mutuel',
  '343': 'mutuel',
  '8': 'okk',
  '509': 'sympany',
  '455': 'atupri'
};

const AGE_MAP = {
  'AKL-ERW': 'adult',
  'AKL-JUG': 'young',
  'AKL-KIN': 'child'
};

const MODEL_MAP = {
  'TAR-BASE': 'standard',
  'TAR-HAM': 'family',
  'TAR-HMO': 'hmo',
  'TAR-DIV': 'telemed'
};

async function run() {
  console.log('Step 1: Fetching package metadata from opendata.swiss CKAN API...');
  
  const response = await fetch('https://ckan.opendata.swiss/api/3/action/package_show?id=health-insurance-premiums', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch package metadata from opendata.swiss: status ${response.status}`);
  }

  const json = await response.json();
  if (!json.success) {
    throw new Error('Failed to parse metadata: success flag is false');
  }

  const resources = json.result.resources;
  const csvResource = resources.find(r => {
    const isCsv = r.format === 'CSV';
    let nameStr = '';
    if (typeof r.name === 'string') {
      nameStr = r.name;
    } else if (r.name && typeof r.name === 'object') {
      nameStr = r.name.en || r.name.de || r.name.fr || r.name.it || '';
    }
    const urlStr = r.url || '';
    
    return isCsv && (
      nameStr.toLowerCase().includes('prämien_ch') || 
      nameStr.toLowerCase().includes('praemien_ch') ||
      urlStr.toLowerCase().includes('praemien_ch') ||
      urlStr.includes('Pr%C3%A4mien_CH')
    );
  });
  
  if (!csvResource) {
    throw new Error('Could not find CSV resource for premiums in CKAN metadata');
  }

  const downloadUrl = csvResource.url;
  console.log(`Step 2: Found official premium CSV download link: ${downloadUrl}`);
  
  console.log('Step 3: Downloading and parsing CSV file...');
  
  const csvResponse = await fetch(downloadUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  });

  if (!csvResponse.ok) {
    throw new Error(`Failed to download premium CSV: status ${csvResponse.status}`);
  }

  const premiumsMap = {};
  const reader = csvResponse.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let lineBuffer = '';
  let headerParsed = false;
  let headers = [];
  let totalLines = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    lineBuffer += decoder.decode(value, { stream: true });
    const lines = lineBuffer.split('\n');
    lineBuffer = lines.pop(); // keep last incomplete line

    for (const line of lines) {
      totalLines++;
      if (!line.trim()) continue;

      // Parse CSV row respecting potential quotes
      const row = [];
      let insideQuote = false;
      let entry = '';
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          insideQuote = !insideQuote;
        } else if (char === ',' && !insideQuote) {
          row.push(entry.trim());
          entry = '';
        } else {
          entry += char;
        }
      }
      row.push(entry.trim());

      if (!headerParsed) {
        if (row[0] && row[0].charCodeAt(0) === 0xFEFF) {
          row[0] = row[0].substring(1);
        }
        headers = row;
        headerParsed = true;
        continue;
      }

      const versicherer = row[0];
      const kanton = row[1];
      const jahr = row[3];
      const region = row[5];
      const akl = row[6];
      const unfall = row[7];
      const tariftyp = row[9];
      const franchiseStr = row[12];
      const praemieStr = row[13];
      const bezeichnung = row[16] || '';

      // Only import 2026 premiums
      if (jahr !== '2026') continue;
      
      const insurerId = INSURER_MAP[versicherer];
      if (!insurerId) continue;

      const ageCategory = AGE_MAP[akl];
      if (!ageCategory) continue;

      const modelType = MODEL_MAP[tariftyp];
      if (!modelType) continue;

      if (!franchiseStr || !franchiseStr.startsWith('FRA-')) continue;
      const franchise = parseInt(franchiseStr.replace('FRA-', ''), 10);
      if (isNaN(franchise)) continue;

      const accident = unfall === 'MIT-UNF'; // true for MIT-UNF, false for OHN-UNF

      const premium = parseFloat(praemieStr);
      if (isNaN(premium)) continue;

      const key = `${insurerId}_${kanton}_${region}_${ageCategory}_${franchise}_${modelType}_${accident}`;

      if (!premiumsMap[key] || premium < premiumsMap[key].premium) {
        premiumsMap[key] = {
          premium,
          modelName: bezeichnung
        };
      }
    }
  }

  // Handle remaining buffer line
  if (lineBuffer.trim()) {
    const row = lineBuffer.split(',').map(s => s.trim());
    const versicherer = row[0];
    const kanton = row[1];
    const jahr = row[3];
    const region = row[5];
    const akl = row[6];
    const unfall = row[7];
    const tariftyp = row[9];
    const franchiseStr = row[12];
    const praemieStr = row[13];
    const bezeichnung = row[16] || '';

    if (jahr === '2026') {
      const insurerId = INSURER_MAP[versicherer];
      const ageCategory = AGE_MAP[akl];
      const modelType = MODEL_MAP[tariftyp];
      if (insurerId && ageCategory && modelType && franchiseStr && franchiseStr.startsWith('FRA-')) {
        const franchise = parseInt(franchiseStr.replace('FRA-', ''), 10);
        if (!isNaN(franchise)) {
          const accident = unfall === 'MIT-UNF';
          const premium = parseFloat(praemieStr);
          if (!isNaN(premium)) {
            const key = `${insurerId}_${kanton}_${region}_${ageCategory}_${franchise}_${modelType}_${accident}`;
            if (!premiumsMap[key] || premium < premiumsMap[key].premium) {
              premiumsMap[key] = {
                premium,
                modelName: bezeichnung
              };
            }
          }
        }
      }
    }
  }

  console.log(`Step 4: Aggregated ${Object.keys(premiumsMap).length} unique official premium profiles.`);

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const outputPath = path.join(publicDir, 'premiums_2026.json');
  fs.writeFileSync(outputPath, JSON.stringify(premiumsMap));
  console.log(`Step 5: Successfully saved database to ${outputPath}`);
  console.log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
}

run().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});

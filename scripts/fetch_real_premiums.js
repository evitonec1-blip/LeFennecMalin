import fs from 'fs';

const CSV_URL = "https://opendata.bagnet.ch/?r=/download&path=L1ByYWVtaWVuL1Byw6RtaWVuX0NILmNzdg%3D%3D";

const INSURER_MAPPING = {
    "1384": "helsana",
    "1542": "css",
    "0290": "assura",
    "1509": "swica",
    "0376": "kpt",
    "1555": "concordia",
    "1479": "visana",
    "0343": "sanitas",
    "0509": "mutuel",
    "1535": "sympany",
    "0455": "atupri",
    "0312": "okk"
};

const MODEL_MAPPING = {
    "BASE": "standard",
    "TAR-HAM": "family", 
    "TAR-DIV": "telemed"
};

async function main() {
    console.log(`2. Téléchargement du CSV depuis ${CSV_URL}...`);
    const csvRes = await fetch(CSV_URL);
    
    // We get ArrayBuffer and decode because it's huge
    const buffer = await csvRes.arrayBuffer();
    const decoder = new TextDecoder('utf-8');
    const csvContent = decoder.decode(buffer);
    
    console.log("3. Parsing des données...");
    const lines = csvContent.split('\n');
    const headers = lines[0].trim().replace(/^\uFEFF/, '').split(',');
    
    const db = {};
    let matched = 0;
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const row = line.split(',');
        
        const versicherer = row[0]; // z.B. "0008" oder "8"
        const padded = versicherer.padStart(4, '0');
        
        const mapped = INSURER_MAPPING[padded];
        if (!mapped) continue;
        
        const canton = row[1];
        const region = row[5];
        const ak = row[6];
        
        let age_cat = "";
        if (ak === 'AKL-ERW') age_cat = 'adult';
        else if (ak === 'AKL-JUG') age_cat = 'young';
        else if (ak === 'AKL-KIN') age_cat = 'child';
        else continue;
        
        const unf = row[7];
        const accident = unf === 'MIT-UNF' ? 'true' : 'false';
        
        const tariftyp = row[9];
        const model_type = MODEL_MAPPING[tariftyp] || 'standard';
        
        const franchiseStr = row[12];
        const franchise = franchiseStr.replace('FRA-', '');
        
        const premium = parseFloat(row[13]);
        const model_name = row[16];
        
        const key = `${mapped}_${canton}_${region}_${age_cat}_${franchise}_${model_type}_${accident}`;
        
        if (!db[key] || premium < db[key].premium) {
            db[key] = { premium, modelName: model_name };
            matched++;
        }
    }
    
    console.log(`4. Sauvegarde de ${Object.keys(db).length} offres...`);
    fs.writeFileSync('public/premiums_2026.json', JSON.stringify(db));
    console.log("Terminé avec succès!");
}

main().catch(console.error);
